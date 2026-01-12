# Logic 组件检查

按照 [MortiseSpecCodeEngine-规则文档](../msc-doc/MortiseSpecCodeEngine-规则文档.md) 校验 Logic 逻辑组件结构并进行修复

* 遍历每一个模块的 Logic 组件，路径：./src/project/{模块目录}/logic/{Logic 组件}
* 检查如下内容
    1. 检查 Logic 组件语法是否符合 MSC Engine 规范
    2. 检查 Logic 组件的 Action 和 State 是否正确
    3. 检查 Logic 组件需求完整度 [MSC-Logic-组件需求完整度检查指令](./MSC-Logic-组件需求完整度检查指令.md)