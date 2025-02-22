:::info{title="跃跃欲试想贡献？"}
[查看贡献指南](/manual/contribution)
:::

> S2 使用 pnpm 作为包管理器

```bash
git clone git@github.com:antvis/S2.git

cd S2

# 切换到 2.x 分支
git checkout next

# 安装依赖
pnpm install # 或者 pnpm bootstrap

# 打包
pnpm build

# 调试 s2-core
pnpm core:start

# 调试 s2-react 和 s2-core（推荐）
pnpm core:build-esm # 首次运行需要先执行一次（安装依赖后自动执行）
pnpm react:playground

# 调试 s2-react-components
pnpm react-components:playground

# 调试 s2-vue 和 s2-core
pnpm vue:playground

# 单元测试
pnpm test
pnpm core:test
pnpm react:test

# 更新单元格测试快照
pnpm core:test -- -u
pnpm react:test -- -u

# 代码风格和类型检测
pnpm lint

# 本地启动官网
pnpm build # 首次运行官网需要先执行一次
pnpm site:start
```
