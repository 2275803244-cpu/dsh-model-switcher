# dsh-client-ui-model-switcher

DeepSeek Harness Web GUI 的**一键服务商/模型切换**客户端插件。

会话标题栏加一个滑块按钮：弹出所有已配置的服务商和它们的模型，**点一下即切换**，不用再进设置一个个配。

## 功能

- **替换原生模型选择器**：输入框右下角的原生模型选择器被替换为**增强版**——默认显示当前服务商的模型列表，点击「切换服务商 →」可换服务商，两级联动：顶部一排服务商 chips（带模型数），**先点服务商，下方联动显示该服务商的模型列表**，点模型即切换，服务商（及其地址）自动跟随
- **只显示配置好的**：面板通过 `llm.providers` + `settings.describe` + `credentials.describe` 检查每个服务商的 key 状态，**没有 key 的服务商不显示**（补 key 后自动出现）
- **当前状态**：面板顶部显示当前服务商 / 模型，当前项带蓝色高亮和 ✓
- **实时目录**：打开时自动刷新模型目录（与 `/model` 命令、composer 模型席位共享同一份状态，任一入口切换其它入口同步）
- **异常提示**：服务商不可用、目录加载失败、失败的服务商列表都会显示
- **会话限制**：子代理会话（不支持切换模型的）会禁用并提示

## 实现要点

- 槽位：`conversation.session.header.actions`（order=25）
- 服务：`modelDirectories`（`ctx.modelDirectories.directoryFor(sessionId)`）
- 目录状态：`react.useSyncExternalStore` 订阅 `directory.store`（uSES 兼容 SnapshotStore）
- 切换：`directory.select({ provider, model })`——与 `/model` 弹窗和 composer 模型席位**同一个控制器**，Host 是唯一事实源
- 纯浏览器侧，手写 ModuleLoader bundle，零构建（仅 react / react/jsx-runtime）

## 安装

```powershell
pnpm --dir "$HOME\.dsh\profiles\web" add github:2275803244-cpu/dsh-model-switcher
```

`cordis.patch.yml` 追加：

```yaml
- insert:
    - id: ui-model-switcher
      name: 'dsh-client-ui-model-switcher'
```

重启 `dsh web`，会话标题栏出现滑块按钮。

> 服务商目录来自 设置 → 模型 里已配置的适配器；要增加新服务商（如本地 Ollama），先在模型设置中配置好，一键切换里就会出现。

## 0.8.1 修复（本地补丁）

针对 DSH 0.1.2-rc.1 的 Remote 契约与原生选择器行为修正了以下问题（`test/client.test.cjs` 覆盖）：

| # | 问题 | 修复 |
| - | ---- | ---- |
| 1 | `usableProviders` 调用不存在的 API（`llm.providers({})`、`settings.describe({})`、`credentials.describe({refs})`），异常被吞掉后返回 null，**"只显示配好 key 的服务商" 实际从未生效** | 改用 `llm.listProviders()` + `llm.listConfigurableProviders()` + `settings.describe()` + `credentials.describe(refs: string[])`，并用注册表判定路由是否 active |
| 2 | 取 API 面用 `connection.api`，该属性在 `ConnectionHandle` 上不存在（当前实现是 `ctx.remote`），导致上面第 1 条必然失败 | 改用 `ctx.remote`（`inject` 增加 `remote`），保留 `connection.api` 兜底 |
| 3 | `usableMap` 跨开关持久，补 key 后重开面板仍被旧的过滤结果挡住 | 每次打开重置并重新拉取，异步结果用 live 标记防竞态 |
| 4 | 过滤后若一个服务商都不剩，面板空白无法切换 | 过滤结果为空时回退到完整列表 |
| 5 | 切换模型只提交 `{provider, model}`，丢掉推理强度：与 `/model` 弹窗/composer 席位行为不一致，原生席位会带 `reasoning.defaultEffort`，重选当前模型时保留用户已选强度 | 新增 `selectionFor()`，与原生 `selectionOf()` 同语义 |
| 6 | 两个触发器都显示原始模型 id（`deepseek-v4.1-flash-expires-on-0910`），且不显示推理强度 | 新增 `modelName()`/`effortLabel()`，显示模型名 + `· 强度` |
| 7 | 面板打开时点触发器不会关闭 | 触发器改为切换语义 |
| 8 | `rootRef.current` 可能为 null 时的 `contains()` 抛错 | 加空值保护 |

测试：

```powershell
node test/client.test.cjs    # 10 项断言，无需安装依赖
```

## 卸载

```powershell
pnpm --dir "$HOME\.dsh\profiles\web" remove dsh-client-ui-model-switcher
# 删掉 cordis.patch.yml 的 ui-model-switcher 行，重启
```

## 参考

- `ModelDirectory` / `ModelDirectoryResolver`：`dsh-client-ui-model-selection/lib/types/client/service.d.ts`、`directory.d.ts`
- 目录状态契约：`dsh-client-ui-model-selection/lib/types/client/directory.d.ts`
- 类型：`dsh-host-apiproxy/lib/types/api/sessions.d.ts`（ModelSelection / ModelProviderGroup / SessionModels）