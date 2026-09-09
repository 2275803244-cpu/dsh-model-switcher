# 贡献指南（Contributing）

感谢你愿意改进 `dsh-client-ui-model-switcher`！本文档说明如何搭建环境、跑测试、提交改动。

## 环境要求

- **Node.js ≥ 22.12**（dsh 运行时的要求）
- **Git**
- 一个能启动的 DeepSeek Harness web GUI，用于手动验证改动

## 本地开发

### 1. Fork 并克隆

```powershell
git clone git@github.com:<你的用户名>/dsh-model-switcher.git
cd dsh-model-switcher
```

### 2. 链接到 dsh profile（边改边看）

不用发布到 GitHub，直接让 dsh 加载你的本地目录：

```powershell
pnpm --dir "$HOME\.dsh\profiles\web" add "link:$PWD"
```

然后在 `$HOME\.dsh\profiles\web\cordis.patch.yml` 里注册：

```yaml
- insert:
    - id: ui-model-switcher
      name: 'dsh-client-ui-model-switcher'
```

重启 `dsh web`，改动即刻生效（改 `lib/client.js` 后刷新页面即可）。

### 3. 运行测试

```powershell
node test/client.test.cjs
```

- 测试**零依赖**，直接 `node` 跑，不需要 `npm install`
- **提交 PR 前必须全绿**

## 提交 PR

### 分支命名

从 `main` 拉分支：

| 前缀 | 用途 |
| --- | --- |
| `fix/` | 修 bug |
| `feat/` | 新功能 |
| `docs/` | 文档 |
| `chore/` | 杂项（CI、构建等） |

### 提交信息

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
fix: repair provider usability check
feat: add keyboard shortcut for the panel
docs: clarify install steps
```

### 自检清单

提交前请确认：

- [ ] `node test/client.test.cjs` 全部通过
- [ ] **新增行为有对应断言**；修 bug 的 PR 应包含一个在旧代码上会失败的测试
- [ ] 没有引入新的运行时依赖（本插件保持零依赖）
- [ ] `package.json` 的 `version` 已递增（补丁位，例如 `0.8.1` → `0.8.2`）
- [ ] 如果改动影响使用方式，同步更新 `README.md`

### PR 描述模板

```markdown
## 问题
（现象 + 复现步骤）

## 原因
（根因，尽量指到具体函数/API）

## 修复
（改动说明）

## 验证
（测试输出 / 手动验证步骤）
```

## 代码约定

- `lib/index.js` 是**服务端**入口，`lib/client.js` 是**浏览器端**入口
- `lib/client.js` 中不要使用 Node-only API（`fs`、`path`、`process` 等）
- 不新增运行时依赖——这是本插件被广泛使用的原因之一
- 注释可以用中文，但**代码标识符用英文**

## 发布流程（维护者）

1. 合并 PR 到 `main`
2. 递增 `package.json` 的 `version`
3. 打标签并推送：

   ```powershell
   git tag -a vX.Y.Z -m "vX.Y.Z — <一句话说明>"
   git push origin main
   git push origin vX.Y.Z
   ```

4. 在 GitHub 创建 Release，附上打包产物（`lib/`、`cordis.patch.yml`、`package.json`、`README.md`、`LICENSE`）
5. 同步本地 link 目录（若使用 `link:` 安装）

## 有问题？

- 功能建议 / 使用问题 → 开 [Issue](https://github.com/2275803244-cpu/dsh-model-switcher/issues)
- 不确定怎么改 → 先开 Issue 讨论，避免白做工

感谢你的贡献！🎉
