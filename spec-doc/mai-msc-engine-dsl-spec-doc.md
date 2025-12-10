# DSL 配置检查

按照 [mai-msc-engine-spec-doc.md](mai-msc-engine-spec-doc.md) 校验 DSL 配置的字段、结构与约束并进行修复

* 遍历每一个 DSL 配置类（./src/project/{模块目录}/dsl/{DSL 文件}
* 检查 DSL 语法是否符合 MSC Engine 规范
* 检查 DSL 中 Layout 的 View 视图组件是否已经在 MscEnv 中注册
* 检查 DSL 中 Logic 组件是否已经在 MscEnv 中注册
* 检查 DSL 中 Workflow 组件是否已经在 MscEnv 中注册
* 检查 DSL 中 Workflow 配置中的 sender 和 action 均正确