# Logic 组件检查

按照 [mai-msc-engine-spec-doc.md](mai-msc-engine-spec-doc.md) 校验 Logic 逻辑组件结构并进行修复

* 遍历每一个模块的 View 组件（./src/project/{模块目录}/logic/{Logic 组件}
* 检查 Logic 组件语法是否符合 MSC Engine 规范
* 检查 Logic 组件的 Action 和 State 是否正确
* 根据组件目录下的 mai-msc-engine-mcube-spec-doc.md 需求规格文档，检查 View 组件需求完整度，并进行修复和完善