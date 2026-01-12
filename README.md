# 🧩 Mortise Spec Code Engine | Web React 脚手架工程

该工程是基于 Mortise Spec Code Engine 的 Web React 脚手架项目，用于快速创建、验证和调试 MortiseAI 组件（MCube）、模块（Module)、项目（Project）。
它提供了标准化的目录结构、依赖配置与构建环境，用于高效地进行组件开发与测试。

🔗 [Mortise Spec Code Engine | Mortise 规格编码引擎](https://github.com/MortiseAI/mai_msc_engine_ts_module)

# 🧩 MSC Engine Spec 指令（Spec Cmd）

在 MortiseAI 自动生成项目后，由于不同模型的能力差异，代码中可能出现“幻觉”问题导致的细节缺失或错误的。

因此，建议通过一套 **标准化的 Spec 指令** 对工程进行系统化检查与修复。

实践表明，这些 Spec 指令能够覆盖并修正约 **99% 的代码细节问题**，是确保工程质量的重要步骤。

项目首次创建，建议使用 [MSC 工程检查指令](spec-cmd/MSC 工程检查指令.md) 进行初始化检测与修复

	导入 [MSC 工程检查指令.md] 到上下文窗口，执行确认

---

# 📘 Spec 指令总览（Overview）

| 操作类型             | 说明                                   | 主要解决问题                | 指令                                                                                                                                     |
|------------------|--------------------------------------|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| **MSC 工程整体检查**   | 检查 Project 整体代码结构/依赖/命名/组织/需求        | MSC 项目整体排查，并生成报告      | [MSC-工程-整体检查指令](msc/msc-cmd/MSC-工程-整体检查指令.md)                                     		 	                                                 |
| **MSC 工程配置检查**   | 检查 Project 配置                        | MSC 项目配置              | [MSC-工程-配置检查指令](msc/msc-cmd/MSC-工程-配置检查指令.md)                                                                                          |
| **Workflow 工作流检查** | 检查 Workflow 事件流与 Action/State 关联关系   | 工作流语法错误与关联关系错误        | [MSC-Workflow-工作流检查指令](msc/msc-cmd/MSC-Workflow-工作流检查指令.md)                        		                                                  |
| **DSL 配置检查**     | 检查 DSL 配置的字段、结构与约束                   | DSL 不规范、字段缺失       	  | [MSC-DSL-配置检查指令](msc/msc-cmd/MSC-DSL-配置检查指令.md)                            	                                                           |
| **View 组件检查**    | 检查 View 视图组件结构                     	 | View 组件结构错误        		 | [MSC-View-组件检查指令](msc/msc-cmd/MSC-View-组件检查指令.md)                       		                                                             |
| **Logic 组件检查**   | 检查验 Logic 逻辑组件结构                     | Logic 组件结构错误       	  | [MSC-Logic-组件检查指令](msc/msc-cmd/MSC-Logic-组件检查指令.md)                           	  	                                                     |
| **View 组件需求检查**  | 检查 View 组件需求完整度                      | View 组件需求缺失           | [MSC-View-组件需求完整度检查指令](msc/msc-cmd/MSC-View-组件需求完整度检查指令.md) <br/>./src/project/.../组件目录/mai-msc-engine-mcube-spec-doc.md                      	 |
| **Logic 组件需求检查** | 检查 Logic 组件需求完整度                     | Logic 组件需求完缺失         | [MSC-Logic-组件需求完整度检查指令](msc/msc-cmd/MSC-Logic-组件需求完整度检查指令.md) <br/>./src/project/.../组件目录/mai-msc-engine-mcube-spec-doc.md                      	                                        |
| **View 组件样式与结构检查** | 检查 View 组件 LESS 与 TSX 基础语法与匹配        | 样式错误、引用问题             | ./src/project/.../组件目录/less/xxx.less <br/>./src/project/.../组件目录/xxx.tsx                                                               |
| **生成/更新 View 组件 Spec Doc** | 基于 View 组件代码生成/更新 Spec Doc 文档        | 逆向生成文档                | [MSC-View-组件-Spec文档生成指令](msc/msc-cmd/MMSC-View-组件-Spec文档生成指令.md)                              		                                                                      |
| **生成/更新 Logic 组件 Spec Doc** | 基于 Logic 组件代码生成/更新 Spec Doc 文档       | 逆向生成文档                |  [MSC-Logic-组件-Spec文档生成指令](msc/msc-cmd/MSC-Logic-组件-Spec文档生成指令.md)          		    	                                                                                   |
| **错误日志检查**       | 检查运行日志并定位错误                          | 启动异常、运行错误             | mai-msc-engine-log.txt                                                 		 	                                                            |

---

# 1.工程指令（Project-Level Cmd）

## 1.1 MSC 工程整体检查

	1. 导入 [MSC-工程-整体检查指令] 到上下文窗口
	2. 执行确认

---

## 1.2 MSC 工程配置检查

	1. 导入 [MSC-工程-配置检查指令] 到上下文窗口
	2. 执行确认

---

## 1.3 Workflow 工作流检查

	1. 导入 [MSC-Workflow-工作流检查指令] 到上下文窗口
	2. 执行确认

---

## 1.4 DSL 配置检查

	1. 导入 [MSC-DSL-配置检查指令] 到上下文窗口
	2. 执行确认

---

## 1.5 View 组件检查

	1. 导入 [MSC-View-组件检查指令] 到上下文窗口
	2. 执行确认

---

## 1.6 Logic 组件检查

	1. 导入 [MSC-Logic-组件检查指令] 到上下文窗口
	2. 执行确认

---

# 2. 组件指令（Component-Level Cmd）

## 2.1 组件需求检查

每个 View 或 Logic 组件都会生成对应 Spec 规格文档：

.组件目录 / mai-msc-engine-mcube-spec-doc.md

用于检查组件是否完整实现需求。

	1. 导入 [MSC-View-组件需求完整度检查指令 / MSC-Logic-组件需求完整度检查指令] 到上下文窗口
    2. 导入 [mai-msc-engine-mcube-spec-doc.md] 到上下文窗口
	2. 导入核心组件文件（如 MaiMainBoxBrick.tsx / MaiMainLogic.ts）到上下文窗口
	3. 执行确认

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

## 2.3 生成/更新 View 组件 Spec 规格文档

基于 Code 生成 Doc

	1. 导入 [MSC-View-组件-Spec文档生成指令] 到上下文窗口
	2. 导入核心组件文件（如 MaiMainBoxBrick.tsx）到上下文窗口
	3. 执行确认

---

## 2.4 生成/更新 Logic 组件 Spec Doc

基于 Code 生成 Doc

	1. 导入 [MSC-Logic-组件-Spec文档生成指令] 到上下文窗口
	2. 导入核心组件文件（如 MaiMainLogic.ts）到上下文窗口
	3. 执行确认

---

# 3. 日志检查（Runtime Log Check）

项目启动后，日志记录在：mai-msc-engine-log.txt ，可用于快速定位运行异常。

    1. 导入 mai-msc-engine-log.txt 到上下文窗口
    2. 执行 Spec 指令 ：检查日志内容并修复其中的错误

---

# 📌 最佳实践流程

| 步骤    | 操作内容             | 目的           |
|-------|------------------|--------------|
| **1** | 执行 MSC-工程-整体检查指令 | 可解决修复全局 99% 异常 |
| **2** | 执行日志检查指令         | 解决具体启动与运行异常  |
| **3** | 按需执行其他命令         | 进入正常开发周期     |

---

# 🎯 最终说明

通过 MSC Spec 指令操作流程能够显著提升 MortiseAI 自动生成项目的稳定性、结构一致性与工程可维护性，是进入实际开发前的重要准备步骤。