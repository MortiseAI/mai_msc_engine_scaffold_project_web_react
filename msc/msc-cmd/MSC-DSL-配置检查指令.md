# MSC-DSL-配置检查

按照 [MortiseSpecCodeEngine-规则文档](../msc-doc/MortiseSpecCodeEngine-规则文档.md) 检查 DSL 配置的字段、结构与约束，并进行修复

* 遍历每一个模块 DSL 配置类，路径：./src/project/{模块目录}/dsl/...
* 检查如下内容
  1. 检查模块 DSL 内容是否符合 MSC Engine 规范
  2. 检查模块 DSL 中 Layout 的 View 视图组件是否已经在 MscEnv 中注册
  3. 检查模块 DSL 中 Logic 组件是否已经在 MscEnv 中注册
  4. 检查模块 DSL 中 Workflow 组件是否已经在 MscEnv 中注册
  5. 检查模块 DSL 中 Workflow 配置中的 sender 和 action 是否正确
  6. 最后按照 MortiseSpecCodeEngine DSL 规则对模块 DSL 中的格式化