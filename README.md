# dsh-client-ui-model-switcher

DeepSeek Harness Web GUI 的**一键服务商/模型切换**客户端插件。

会话标题栏加一个滑块按钮：弹出所有已配置的服务商和它们的模型，**点一下即切换**，不用再进设置一个个配。

## 功能

- **两级联动**：顶部一排服务商 chips（带模型数），**先点服务商，下方联动显示该服务商的模型列表**，点模型即切换，服务商（及其地址）自动跟随
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

## 卸载

```powershell
pnpm --dir "$HOME\.dsh\profiles\web" remove dsh-client-ui-model-switcher
# 删掉 cordis.patch.yml 的 ui-model-switcher 行，重启
```

## 参考

- `ModelDirectory` / `ModelDirectoryResolver`：`dsh-client-ui-model-selection/lib/types/client/service.d.ts`、`directory.d.ts`
- 目录状态契约：`dsh-client-ui-model-selection/lib/types/client/directory.d.ts`
- 类型：`dsh-host-apiproxy/lib/types/api/sessions.d.ts`（ModelSelection / ModelProviderGroup / SessionModels）