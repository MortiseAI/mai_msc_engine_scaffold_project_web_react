# MSC-Workflow-工作流

按照 [MortiseSpecCodeEngine-规则文档](../msc-doc/MortiseSpecCodeEngine-规则文档.md) 检查 Workflow 事件流与 Action/State 关联关系，并进行修复

* 遍历每一个 MscWorkflow 实现类，路径：./src/project/{模块目录}/workflow/{Workflow 文件}
* 检查如下内容
  1. 检查 Workflow 内容是否符合 MSC Engine 规范
  2. 使用组件的 Action 和 State 的 Keys/Model 替换 Workflow 的事件名和数据模型名
  3. 检查对应的 Action 事件，是否已经在对应的 DSL 配置（./src/project/{模块目录}/dsl/{DSL 配置文件}）中进行注册