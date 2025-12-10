# Workflow 工作流检查

按照 [mai-msc-engine-spec-doc.md](mai-msc-engine-spec-doc.md) 校验 Workflow 事件流与 Action/State 关联关系并进行修复

* 遍历每一个 MscWorkflow 实现类（./src/project/{模块目录}/workflow/{Workflow 文件}
* 检查 Workflow 语法是否符合 MSC Engine 规范
* 使用组件的 Action 和 State 的 Keys/Model 替换对于的事件和数据模型
* 检查对应的 Action 事件，是否已经在对应的 DSL 配置（./src/project/{模块目录}/dsl/{DSL 配置文件}）中进行注册