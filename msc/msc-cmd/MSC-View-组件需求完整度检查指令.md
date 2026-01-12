# MSC-View-组件需求完整度检查

按照 [MortiseSpecCodeEngine-规则文档](../msc-doc/MortiseSpecCodeEngine-规则文档.md) 校验 View 视图组件结构并进行修复

* 根据 View 组件的 mai-msc-engine-mcube-spec-doc.md 规格文档，检查组件需求完整度，并进行修复和完善
    1. 遍历 View 组件文件（./src/project/{模块目录}/view/{View 组件目录}
    2. 从 View 组件核心 BaseMscBrick、BaseMscVirtual、BaseMscLayer 实现类开始进行检查
        1. 组件 MSC Engine 规范检查
        2. 组件 [功能与需求] 完善度检查：需求和关联知识内容
        3. 组件 [界面与视图] 完善度检查：GUI 内容
        4. 组件 [接收事件/发送事件] 完善度检查：事件、数据和关联知识内容