# dsh-client-ui-model-switcher

DeepSeek Harness Web GUI 的**一键服务商/模型切换**客户端插件。

会话标题栏加一个滑块按钮：弹出所有已配置的服务商和它们的模型，**点一下即切换**，不用再进设置一个个配。

## 功能

- **一键切换**：每个服务商分组下列出全部模型，点模型行即提交完整 provider+model 选择
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

> 服务商目录来自 设置 → 模型 里已配置的适配器。**一键内置多服务商**：把 `docs/llm-pi-ai.example.yaml` 的 `llm-pi-ai` 段拷进 `$DSH_HOME/settings.yaml`（热重载，无需重启），OpenAI / Anthropic / Gemini / Groq / xAI / OpenRouter / Mistral / Ollama 即全部出现在切换面板；有 API key 的立刻可用，没 key 的补 key（同名环境变量或 Models 页面）后自动亮起。

## 卸载

```powershell
pnpm --dir "$HOME\.dsh\profiles\web" remove dsh-client-ui-model-switcher
# 删掉 cordis.patch.yml 的 ui-model-switcher 行，重启
```

## 参考

- `ModelDirectory` / `ModelDirectoryResolver`：`dsh-client-ui-model-selection/lib/types/client/service.d.ts`、`directory.d.ts`
- 目录状态契约：`dsh-client-ui-model-selection/lib/types/client/directory.d.ts`
- 类型：`dsh-host-apiproxy/lib/types/api/sessions.d.ts`（ModelSelection / ModelProviderGroup / SessionModels）