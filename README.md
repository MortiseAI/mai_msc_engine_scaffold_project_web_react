# 🧩 Mortise Spec Code Engine | Web React 脚手架工程

该工程是基于 Mortise Spec Code Engine 的 Web React 脚手架项目，用于快速创建、验证和调试 MortiseAI 组件（MCube）、模块（Module)、项目（Project）。
它提供了标准化的目录结构、依赖配置与构建环境，用于高效地进行组件开发与测试。

🔗 [Mortise Spec Code Engine | Mortise 规格编码引擎](https://github.com/MortiseAI/mai_msc_engine_ts_module)

# 🧩 版本说明

标签 : 🎉 新功能 🧱 优化结构 ⚙️ 构建/环境 🐞 修复问题 🚀 性能/架构升级

>🎊 Tag v0.0.1 · 初始化版本
>*   📅 2025-11-10
>* 🎉 首个版本发布，建立脚手架工程
>* 📦 依赖 "@mortiseai/mai_msc_engine_ts_module": "^0.0.1"

>🎊 Tag v0.0.2 · Spec Doc 版本
>*   📅 2025-12-10
>* 🧱 完善 Spec 操作

>🎊 Tag v0.0.3 · Spec 指令版本
>*   📅 2025-12-18
>* 🧱 完善 Spec 指令

# 🧩 Spec 操作指南（Spec Operation Guide）

在 MortiseAI 自动生成项目后，由于不同模型的能力差异，代码中可能出现“幻觉”问题导致的细节缺失或错误的。

因此，建议通过一套 **标准化的 Spec 指令** 对工程进行系统化检查与修复。

实践表明，这些 Spec 指令能够覆盖并修正约 **99% 的代码细节问题**，是确保工程质量的重要步骤。

项目首次创建，建议使用 [Spec 项目检查清单指令](spec-cmd/mai-msc-engine-project-check-spec-cmd.md) 进行初始化检测与修复

	1. 导入 mai-msc-engine-project-check-spec-cmd 到上下文窗口
	2. 执行 Spec 指令 ：根据 Spec 项目检查指令对项目进行检查和修复

---

# 📘 Spec 指令总览（Overview）

| 操作类型             | 说明                                | 主要解决问题         | 文档路径                                                                  |
|--------------------|------------------------------------|--------------------|--------------------------------------------------------------------------|
| **Project 工程检查**    | 检查 Project 代码结构/依赖/命名/组织          | 结构缺陷、工程不一致       | ./spec-cmd/mai-msc-engine-project-check-spec-cmd.md                             |
| **Workflow 工作流检查** | 检查 Workflow 事件流与 Action/State 关联关系 | 工作流语法错误与关联关系错误 | ./spec-cmd/mai-msc-engine-workflow-spec-cmd.md                           		  |
| **DSL 配置检查**        | 检查 DSL 配置的字段、结构与约束               | DSL 不规范、字段缺失       | ./spec-cmd/mai-msc-engine-dsl-spec-cmd.md                                	    |
| **View 组件检查**       | 检查 View 视图组件结构                     	| View 组件结构错误         | ./spec-cmd/mai-msc-engine-view-spec-cmd.md                               		  |
| **Logic 组件检查**      | 检查验 Logic 逻辑组件结构                    | Logic 组件结构错误        | ./spec-cmdc/mai-msc-engine-logic-spec-cmd.md                              	  |
| **组件需求检查**         | 检查 View/Logic 组件需求实现程度             | View/Logic 组件需求完整度 | ./src/project/.../组件目录/mai-msc-engine-mcube-spec-doc.md                      |
| **样式与结构检查**       | 检查 View 组件 LESS 与 TSX 基础语法与匹配     | 样式错误、引用问题         | ./src/project/.../组件目录/less/xxx.less <br/>./src/project/.../组件目录/xxx.tsx  |
| **错误日志检查**         | 检查运行日志并定位错误                       | 启动异常、运行错误         | ./mai-msc-engine-log.txt                                                 		 |

---

# 1. 通用 Spec 指令（Project-Level Spec Checks）

## 1.1 Project 工程检查

	1. 导入 mai-msc-engine-project-check-spec-cmd 到上下文窗口
	2. 执行 Spec 指令 ：根据 Spec 项目检查指令对项目进行检查和修复

---

## 1.2 Workflow 工作流检查

	1. 导入 mai-msc-engine-workflow-spec-cmd 到上下文窗口
	2. 执行 Spec 指令 ：根据工作流 Spec 指令，对项目 Workflow 进行检查与修改

---

## 1.3 DSL 配置检查

	1. 导入 mai-msc-engine-dsl-spec-cmd 到上下文窗口
	2. 执行 Spec 指令 ：根据 DSL 配置 Spec 指令，对项目 DSL 配置进行检查与修改

---

## 1.4 View 组件检查

	1. 导入 mai-msc-engine-view-spec-cmd 到上下文窗口
	2. 执行 Spec 指令 ：根据视图组件 Spec 指令，对项目 View 组件进行检查与修改

---

## 1.5 Logic 组件检查

	1. 导入 mai-msc-engine-logic-spec-cmd 到上下文窗口
	2. 执行 Spec 指令 ：根据逻辑组件 Spec 指令，对项目 Logic 组件进行检查与修改

---

# 2. 组件 Spec 指令（Component-Level Spec Checks）

## 2.1 组件需求检查

每个 View 或 Logic 组件都会生成对应 Spec 文档：

.组件目录 / mai-msc-engine-mcube-spec-doc.md

用于检查组件是否完整实现需求。

	1. 导入 mai-msc-engine-mcube-spec-doc.md 到上下文窗口
	2. 导入核心组件文件（如 MaiMainBoxBrick.tsx / MaiMainLogic.ts）到上下文窗口
	3. 执行 Spec 指令 ：根据组件 Spec 文档，对组件进行需求一致性检查

---

## 2.2 样式与结构检查

每个 View 组件包含：

- LESS 样式文件（.less）
- React 组件文件（.tsx）

建议进行基础结构与语法检查。

	1. 导入 LESS 文件（如：mai-main-box.less）到上下文窗口
	2. 导入 TSX 文件（如：MaiMainBoxComponent.tsx）到上下文窗口
	3. 执行 Spec 指令 ：检查 less 与 tsx 是否符合语法规范，类名与结构是否一致

---

# 3. 日志检查（Runtime Log Check）

项目启动后，日志记录在： mai-msc-engine-log.txt ，可用于快速定位运行异常。

    1. 导入 mai-msc-engine-log.txt 到上下文窗口
    2. 执行 Spec 指令 ：检查日志内容并修复其中的错误

---

# 📌 最佳实践流程（Recommended Workflow）

| 步骤        | 操作内容  | 目的       |
|------------|----------|-----------|
| **Step 1** | 项目首次创建，执行 Spec 项目检查清单指令 | 可解决修复全局 99% 问题  |
| **Step 2** | 执行组件 Spec 指令    | 确保组件实现正确，避免 UI 语法与引用错误 |
| **Step 3** | 执行日志检查 Spec 指令      | 修复启动与运行异常 |
| **Step 4** | 按需重新生成与微调 | 进入正常开发周期  |

---

# 🎯 最终说明

以上 Spec 操作流程能够显著提升 MortiseAI 自动生成项目的稳定性、结构一致性与工程可维护性，是进入实际开发前的重要准备步骤。
