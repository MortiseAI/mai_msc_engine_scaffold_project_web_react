# 🧩 MortiseSpecCodeEngine 规则文档 - v0.0.1

## 1.MortiseSpecCodeEngine 介绍
MortiseSpecCodeEngine（简称 MSC Engine）是一款专为 Spec Coding 设计的组件化代码框架引擎。通过通用结构的组件化组装与事件机制，实现组件间的高效交互与通信，助力 AI 智能体自动完成复杂软件项目的代码编写任务。

## 2.MortiseSpecCodeEngine 核心组件
MSC Engine 的核心组件分为两大类：View 组件 和 Logic 组件。

#### 2.1 View 视图组件
View 组件专注于 GUI 视图的拆解和重构，通过将界面划分为多个独立的视图单元，实现灵活的组合与独立开发。根据不同的视图功能，View 组件进一步细分为三类：Layer 层布局组件、Virtual 虚拟布局组件、Brick 块组件

###### 2.1.1 Layer 视图层布局组件
基于 FlexLayout 进行空间组织与排布，用于管理多个子 Layer 和 Brick 组件，负责界面基础结构的布局和分区。

###### 2.1.2 Virtual 视图虚拟布局组件
解决传统多层 Layer 叠加导致的 GUI 层级过深和性能问题。Virtual 本身不渲染实体视图，但能作为视图组件容器统一管理和调度其子组件。例如，Dialog（弹窗组件）通常以 Virtual 的方式动态添加，实现弹性布局和高效性能。

###### 2.1.3 Brick 视图块组件
MSC Engine 的最小视图单元，按业务功能划分。Brick 组件遵循以下设计原则：
1. 功能独立，边界清晰：每个 Brick 聚焦独立业务功能，职责明晰，数据流与接口定义明确，便于测试和维护。
2. 低耦合、可独立演进：各 Brick 之间保持低耦合，支持单独升级、替换和扩展，不影响其他模块。
3. 合理合并、接口通信：组件间通过标准接口或协议通信，避免内部实现依赖。如遇强依赖或高频交互的组件，可考虑合并为一个 Brick，提升系统稳定性和维护性。

#### 2.2 Logic 组件
Logic 组件负责数据处理与业务逻辑封装。根据 RPD（业务需求驱动）原则，将如数据库操作、网络请求、三方 SDK 集成等功能独立为可复用的逻辑单元，实现与 View 组件的解耦，支持独立开发、迭代和测试。

#### 2.3 组件代码结构
``` 
|- msc-engine-component                         // 组件根目录
    |- action                                   // 发送事件（Action）相关目录
        |- MscEngineComponentActionKeys.ts      // 定义组件可发送事件的 key 枚举
        |- MscEngineComponentActionModel.ts     // 定义组件发送事件的数据结构
    |- state                                    // 接收事件（State）相关目录
        |- MscEngineComponentStateKeys.ts       // 定义组件可接收事件的 key 枚举
        |- MscEngineComponentStateModel.ts      // 定义组件接收事件的数据结构
    |- data                                     // 组件自定义数据目录
        |- MscEngineComponentCustomData.ts      // 定义组件自定义数据结构与类型
    |- view                                     // 组件自定义 Brick/Layer/Virtual View 目录
        |- MscEngineComponentCustomView.tsx     // 组件自定义 Brick/Layer/Virtual View 实现代码
    |- MscEngineComponentBrick.tsx              // MSC Engine 组件代码(Brick/Layer/Virtual/Logic)
    |- MscEngineComponentView.tsx               // MSC Engine 组件核心关联 Brick/Layer/Virtual 的 View 代码
```

## 3.事件流程
MortiseSpecCodeEngine 采用事件机制实现组件间的高效交互与通信，核心包括“组件事件”和“事件工作流”两部分。

#### 3.1 组件事件
组件事件分为“发送事件（ActionEvent）”和“接收事件（StateEvent）”，用于实现不同组件之间的高效且解耦协作。

###### 3.1.1 发送事件（ActionEvent）
组件通过发送事件主动通知或调用其他组件，实现功能联动。发送事件具备如下特性：
* 通过继承 MscMortiseActionKeys 并添加 @AnnMscActionKeysClass 注解，自动注册为可识别的发送事件。
* 事件通过 @AnnMscActionKey 装饰器定义，支持事件名称、可监听性、数据模型等元数据声明，方便事件追踪、校验和自动化测试。

示例：发送事件定义
``` ts
/**
 * MscEngineComponentActionKeys 组件发送事件
 * 1.继承发送事件父类 MscMortiseActionKeys
 * 2.使用标签 AnnMscActionKeysClass，表明是该文件是发送事件代码，MSC Engine 容器启动后，会通过 @AnnMscActionKeysClass 标签自动对组件事件进行注册
 **/
import {AnnMscActionKey, AnnMscActionKeysClass, MscMortiseActionKeys} from "@mortiseai/mai_msc_engine_ts_module";

@AnnMscActionKeysClass()
export class MscEngineComponentActionKeys extends MscMortiseActionKeys {

    /**
     * @AnnMscActionKey 标签
     * 参数1 acceptable: boolean ，必要参数，表示该事件是否可以通过 MSC 引擎实例让引擎外部进行调用，主要用于与老系统兼容
     * 参数2 action: string ，必要参数 ，事件名称，命名规则为全小写字符，蛇形命名
     * 参数3 model: string ，非必要参数 ，对应的发送事件数据对象文件名，主要用于数据校验和自动化测试
     * 参数4 mock: string ，非必要参数 ，对应的发送事件模拟数据对象文件名，主要用于自动化测试
     **/
    @AnnMscActionKey(false, "msc_engine_module_action_event", "MscEngineComponentActionModel", "MscEngineComponentActionMockModel")
    static MSC_ENGINE_MODULE_ACTION_EVENT = "msc_engine_module_action_event"

}
```
示例：事件数据模型
``` ts
/**
 * MscEngineComponentActionModel 组件发送事件数据对象
 * 1.继承发送事件数据对象父类 MscMortiseActionModel
 **/
import {MscMortiseActionModel} from "@mortiseai/mai_msc_engine_ts_module";
import {CustomParamsData} from "../data/MscEngineComponenteCustomData";

export class MaiMainMProjectActionModel extends MscMortiseActionModel {

    //基础数据类型
    public params1?: string

    //数组类型
    public params2?: Array<any>

    //关联自定义数据对象
    public params3?: CustomParamsData

}
```

###### 3.1.2 接收事件（StateEvent）
组件通过设定接受事件，来响应其它组件的调用

``` ts
/**
 * MscEngineComponentStateKeys 组件接收事件
 * 1.继承接收事件父类 MscMortiseStateKeys
 * 2.使用标签 AnnMscStateKeysClass，表明是该文件是接收事件代码，MSC Engine 容器启动后，会通过 @AnnMscStateKeysClass 标签自动对组件事件进行注册
 **/
import {AnnMscStateKey, AnnMscStateKeysClass, MscMortiseStateKeys} from "@mortiseai/mai_msc_engine_ts_module";

@AnnMscStateKeysClass()
export class MscEngineComponentStateKeys extends MscMortiseStateKeys {

    /**
     * @AnnMscStateKey 标签
     * 参数1 acceptable: boolean ，必要参数，表示该事件是否可以通过 MSC 引擎实例让引擎外部进行监听，主要用于与老系统兼容
     * 参数2 operable: boolean ，必要参数，表示该事件是否可以通过 MSC 引擎实例让引擎外部进行调用，主要用于与老系统兼容
     * 参数3 state: string ，必要参数 ，事件名称，命名规则为全小写字符，蛇形命名
     * 参数4 model: string ，非必要参数 ，对应的发送事件数据对象文件名，主要用于数据校验和自动化测试
     * 参数5 mock: string ，非必要参数 ，对应的发送事件模拟数据对象文件名，主要用于自动化测试
     **/
    @AnnMscStateKey(false, false, "msc_engine_module_state_event", "MscEngineComponentStateModel")
    static MSC_ENGINE_MODULE_STATE_EVENT = "msc_engine_module_state_event"

}
```
``` ts
/**
 * MscEngineComponentStateModel 组件接收事件数据对象
 * 1.继承接收事件数据对象父类 MscMortiseStateModel
 **/
import {MscMortiseStateModel} from "@mortiseai/mai_msc_engine_ts_module";
import {CustomParamsData} from "../data/MscEngineComponenteCustomData";

export class MscEngineComponentStateModel extends MscMortiseStateModel {

    //基础数据类型
    public params1?: string

    //数组类型
    public params2?: Array<any>

    //关联自定义数据对象
    public params3?: CustomParamsData

}
```
#### 3.2 事件工作流 Workflow
MSC Engine 工作流组件，通过监听 View 和 Logic 组件的发送事件，然后转换成对应的 View 和 Logic 组件的发送事件接收事件

``` ts
/**
 * MscEngineComponentWorkflow 工作流组件
 * 1. 继承工作流组件基类 MscWorkflow。
 * 2. 实现 handleActionEvent(event: MscActionEvent) 方法，统一接收通过 DSL 配置的 View 和 Logic 组件的发送事件。
 * 3. 根据业务别名和事件类型，将收到的事件自动转换为目标组件的接收事件（支持无参和有参两种转换方式）。
 */
import {MscActionEvent, MscStateEvent, MscWorkflow} from "@mortiseai/mai_msc_engine_ts_module";

export class MscEngineComponentWorkflow extends MscWorkflow {

    // 统一处理 View/Logic 组件发送的业务事件
    handleActionEvent(event: MscActionEvent) {
        switch (event.getSender()) {
            // 监听业务别名
            case "MscEngineCaseBrick":
                this.handleMscEngineCaseBrick(event)
                break
            default:
                break
        }
    }

    // 将 View/Logic 组件的发送事件转换为对应接收事件，支持无参和有参事件
    handleMscEngineCaseBrick(event: MscActionEvent){
        switch (event.getMessage()) {
            // 无参事件转换
            case MscEngineCaseBrickActionKeys.MSC_ENGINE_BRICK_CASE_ACTION_ONE:
                const event1 = MscStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MscEngineCaseLogic")
                    .setMessage(MscEngineCaseLogicStateKeys.MSC_ENGINE_LOGIC_CASE_STATE_ONE)
                    .build()
                this.sendStateEventObj(event1)
                break
            // 有参事件转换
            case MscEngineCaseBrickActionKeys.MSC_ENGINE_BRICK_CASE_ACTION_TWO:
                const model2 = new MscEngineCaseLogicStateModel()
                model2.params1 = event.getModel().params1
                model2.params2 = [...event.getModel().params2]
                model2.params3 = {...event.getModel().params3}
                const event2 = MscStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MscEngineCaseLogic")
                    .setMessage(MscEngineCaseLogicStateKeys.MSC_ENGINE_LOGIC_CASE_STATE_TWO)
                    .setModel(model2)
                    .build()
                this.sendStateEventObj(event2)
                break
            default:
                break
        }
    }

}
```

## 4.DSL 配置组装
MortiseSpecCodeEngine 通过 Mortise DSL（领域专用语言，Domain-Specific Language）实现组件（View/Logic）与工作流（Workflow）的灵活组装，适配多样业务场景。每个 DSL 实例唯一对应一个业务模块(Module)，二者一一映射，实现高度灵活的业务模块。

Mortise DSL 结构由四部分组成：
1. DSL 初始化：支持通用功能和高级功能两类配置。
    * 通用基础功能：业务 ID、业务名称、模块(Module)视图页面宽高、视图组件、逻辑组件、工作流、附加数据等基础能力。
    * 高级扩展功能（Future）：DSL 动态配置、事件边车、业务分析、自动埋点、智能监控、开发调试等扩展能力。
2. 视图 View 组件
    * 通过 DSL 注册至业务模块(Module)，并基于 FlexLayout 进行布局，将各 View 组件灵活组装成完整业务页面。
3. 逻辑 Logic 组件
    * 通过 DSL 注册到业务模块(Module)，负责承载业务逻辑、数据处理与交互。
4. 工作流 Workflow
    * 基于已注册的 View 和 Logic 组件，定义事件流转，实现组件间的事件驱动、流程编排与自动化联动。

#### 4.1 DSL 初始化
```ts
/**
 * Mortise DSL 配置初始化
 * 
 * @function MscProvider.registryMscDsl(key: string, value: any)
 * @param {string} key - DSL 配置名称，与当前 DSL 文件名一致，与 MscEnv 环境文件下的 _dsl 数据保持一致。
 * @param {object} value - DSL 初始化配置对象。
 */
MscProvider.registryMscDsl("mai_dsl_name", {

    /** 
     * 通用基础功能
     **/
    // 业务 ID，必要，如 "10001"
    bizId: string | undefined,
    // 业务名称，必要，如 "mai_dsl_name"，一般与当前 DSL 文件名一致
    bizName: string | undefined,
    // 页面宽度，非必要默认 1280
    scaleW: number = 1280,
    // 页面高度，非必要默认 720
    scaleH: number = 720,
    // 视图 DSL 配置，必要，不可重复，如："mai_dsl_layout" 
    layout: string = "",
    // 逻辑 DSL 配置，必要，不可重复，如："mai_dsl_logic"
    logic: string = "",
    // 工作流 DSL 配置，必要，不可重复，如："mai_dsl_workflow"
    workflow: string = "",
    // 附加扩展数据，非必要
    ext: Map<string, any> | undefined,

    /** 
     * 高级扩展功能（Future）
     **/
    // 动态配置，设定 DSL 动态配置，非必要，默认 false
    modify: boolean = false,
    // 事件边车，非必要，不可重复，如："mai_dsl_sidecar"
    sidecar: string = "",
    // 业务分析，非必要，不可重复，如："mai_dsl_analysis"
    analysis: string = "",
    // 自动埋点，非必要，不可重复，如："mai_dsl_trace"
    trace: string = "",
    // 智能监控，非必要，不可重复，如："mai_dsl_monitor"
    monitor: string = "",
    // 开发调试，非必要，不可重复，如： "mai_dsl_develop"
    develop: string = ""

});
```

#### 4.2 视图 View 组件 DSL
```ts
/**
 * Mortise View Layout DSL 配置
 * 
 * @function MscProvider.registryMscDsl(key: string, value: any)
 * @param {string} key -  View Layout DSL 配置名称，与 Mortise DSL 初始化配置中的 layout 保持一致
 * @param {object} value - View Layout DSL 配置对象。
 */
MscProvider.registryMscDsl("mai_dsl_layout", [
    {
        // View 组件类型。可选："layer"（层布局）、"virtual"（虚拟布局）、"brick"（基础视图组件）
        type: string,
        // View 组件在业务内的唯一别名。用于组件间事件流转。不可重复。
        name: string,
        // View 组件对应的文件名。需与 Mortise MscEvn 的 View 配置一致。
        view: string,
        // View 组件唯一业务ID。10000 ≤ soleId ≤ 99999。
        soleId: number,
        // View 组件初始展现形式。0：展示；1：隐藏；2：懒加载。
        status: number,
        // View 组件初始布局与位置信息
        attrs: {
            // 宽度设置。-1：100%；-2：自适应子组件宽度；其他：具体像素值。
            width: number,
            // 高度设置。-1：100%；-2：自适应子组件高度；其他：具体像素值。
            height: number,
            // 上间距，像素，默认 0。
            top: number,
            // 下间距，像素，默认 0。
            bottom: number,
            // 左间距，像素，默认 0。
            left: number,
            // 右间距，像素，默认 0。
            right: number,
            // View 组件类型为 “layer”（层布局）时，布局样式类型支持以下选项："flex"：FlexLayout 布局 ，"inline-block"：行内块布局（可并排排列，且可设置宽高），"none"：默认值，表示不设置特殊布局
            type: string,
            // FlexLayout 布局参数（type 为 "flex" 时启用）
            flex: {
                "flex-direction": string,     // 主轴方向
                "flex-wrap": string,          // 换行方式
                "justify-content": string,    // 主轴对齐
                "align-items": string,        // 交叉轴对齐
                "align-content": string       // 多行对齐
            },
            // Z 轴深度，决定视图堆叠顺序。默认与 soleId 相同。
            zIndex: number
        },
        // Layer 层或 Virtual 虚拟布局下的子组件数组，按渲染顺序排列。每个子项为完整的 View 组件对象。
        child: Array<any>,
        // View 组件初始化数据。可选。
        data: Map<string, any>,
        // View 组件附加数据。可选。
        ext: Map<string, any>
    },
    ...
])
```

#### 4.3 逻辑 Logic 组件注册
```ts
/**
 * Mortise Logic DSL 配置
 * 
 * @function MscProvider.registryMscDsl(key: string, value: any)
 * @param {string} key - Logic DSL 配置名称，与 Mortise DSL 初始化配置中的 logic 保持一致
 * @param {object} value - Logic DSL 配置对象。
 */
MscProvider.registryMscDsl("mai_dsl_logic", [
    {
        // 逻辑组件在业务中别名，不可重复，用于 MSC Engine 中组件与组件之间的事件发送与接收，一般与逻辑组件名称相同，如："MaiDslLogic"
        name: string = "",
        // 逻辑组件文件名，与 Mortise MscEvn 中的 Logic 保持一致，如："MaiDslLogic"
        logic: string = "",
        // 逻辑组件初始化数据，非必要
        data: Map<string, string> | undefined,
        // 逻辑组件附加数据，非必要
        ext: Map<string, string> | undefined
    },
    ...
])
```

#### 4.3 工作流组件 Workflow 设置
```ts
/**
 * Mortise Workflow DSL 配置
 * 
 * @function MscProvider.registryMscDsl(key: string, value: any)
 * @param {string} key - Workflow DSL 配置名称，与 Mortise DSL 初始化配置中的 workflow 保持一致
 * @param {object} value - Workflow DSL 配置对象。
 */
MscProvider.registryMscDsl("mai_main_dsl_workflow", [
    {
        // 工作流在业务中别名，不可重复，用于 MSC Engine 中组件与组件之间的事件流转
        name: string = "",
        // 工作流文件名，与 Mortise MscEvn 中的 Workflow 保持一致
        workflow: string = "",
        // 工作流监听的组件发送事件
        events: Array<MscWorkflow> = [
            {
                // 组件名称，视图 View 组件和逻辑 Logic 组件配置的业务别名，如："MaiDslBrick" 或者 "MaiDslLogic"
                sender: string = "",
                // 组件发送事件名，如 ["mai_dsl_brick_action_event"]
                action: Array<string> | undefined   
            },
            ...
        ]
    },
    ...
])
```

## 5.MSC Engine 初始化
MSC Engine 初始化由四个核心部分组成：Environment（环境）、Listener（监听）、Container（容器）、Page（页面）。

### 5.1 Environment（环境）
MSC Engine 采用组件化架构，支持 View、Logic、Workflow、DSL 等核心组件的动态加载，实现灵活组装与更新。组件需要通过 IMscEnv 实现类 MscEvn 进行注册。
``` ts
/**
 * MSC Engine 环境
 * 
 * 1.实现环境接口 IMscEnv
 * 2.MscBrick/MscLayer/MscVirtual 名称固定，为兜底默认 View 组件，当 MSC Engine 为找到对应 View 组件时，会自动加载兜底默认 View 组件进行占位，防止部署错乱，可以自定义兜底样式
 * 
 **/ 
import {IMscEnv} from "@mortiseai/mai_msc_engine_ts_module";
import {MscBrick} from "../common/view/MscBrick";
import {MscLayer} from "../common/view/MscLayer";
import {MscVirtual} from "../common/view/MscVirtual";
import {mai_case_dsl} from "../../project/mai-case-module/dsl/mai_case_dsl";
import {MaiCaseBrick} from "../../project/mai-case-module/view/mai-case-brick/MaiCaseBrick";
import {MaiCaseBrickActionKeys} from "../../project/mai-case-module/view/mai-case-brick/action/MaiCaseBrickActionKeys";
import {MaiCaseBrickStateKeys} from "../../project/mai-case-module/view/mai-case-brick/action/MaiCaseBrickStateKeys";
import {MaiCaseLogic} from "../../project/mai-case-module/logic/mai-case-logic/MaiCaseLogic";
import {MaiCaseLogicActionKeys} from "../../project/mai-case-module/logic/mai-case-logic/action/MaiCaseLogicActionKeys";
import {MaiCaseLogicStateKeys} from "../../project/mai-case-module/logic/mai-case-logic/action/MaiCaseLogicStateKeys";
import {MaiCaseWorkflow} from "../../project/mai-case-module/workflow/MaiCaseWorkflow";

export class MscEvn implements IMscEnv {

	private _dsl: any = {
		/** case **/
		 mai_case_dsl,
	}

	private _view: any = {
		/** common **/
        MscBrick,
        MscLayer,
        MscVirtual,
		/** case **/
		MaiCaseBrick,
	}

	private _logic: any = {
		/** case **/
		MaiCaseLogic,
	}

	private _workflow: any = {
		/** case **/
		MaiCaseWorkflow,
	}

	private _actionKeys: any = {
		/** case **/
		MaiCaseBrickActionKeys,
		MaiCaseLogicActionKeys,	
	}

	private _stateKeys: any = {
		/** case **/
		MaiCaseBrickStateKeys,
		MaiCaseLogicStateKeys,
	}

	// 业务应用ID
    appId(): string {
        return "";
    }

	// 通过视图 View 组件文件名获取 View 组件，对应视图 View 组件 DSL 配置的 view 名称
    view(key: string): any {
        return this._view[key]
    }

	// 通过逻辑 Logic 组件文件名获取 Logic 组件，对应逻辑 Logic 组件 DSL 配置的 logic 名称
    logic(key: string): any {
        return this._logic[key]
    }

	// 通过工作流 Workflow 组件文件名获取 Workflow 组件，对应工作流组件 Workflow 设置 DSL 配置的 workflow 名称
    workflow(key: string): any {
        return this._workflow[key]
    }
    
    // 通过 DSL 文件名获取 DSL 数据对象，对应 Mortise DSL 初始化配置的 DSL 配置名称
    dsl(key: string): any {
        return this._dsl[key]
    }

	// 通过 View 或者 Logic 组件发送事件文件名，获取组件发送事件数据
    actionKeys(key: string): any {
        return this._actionKeys[key]
    }

	// 通过 View 或者 Logic 组件接收事件文件名，获取组件接收事件数据
    stateKeys(key: string): any {
        return this._stateKeys[key]
    }

    sidecarClass(key: string): any {
    }

}
```

### 5.2 Listener（监听）
通过实现监听器接口，可以捕获容器各类事件，包括 ActionEvent、StateEvent、生命周期事件及错误事件，便于外部系统接入和定制扩展。

``` ts
import {MscActionEvent, MscStateEvent, MscLifecycleEvent, MscErrorEvent} from "@mortiseai/mai_msc_engine_ts_module";

/**
 * MSC Engine 监听
 */
export interface MscEngineListener {

    /**
     * MSC View/Logic/Workflow 发送 Action 事件通知，默认容器外不可接收，需设置 AnnMscActionKey 注解参数 acceptable == true，
     * @param event
     */
    onActionEvent(event: MscActionEvent): void

    /**
     * MSC View/Logic/Workflow 接收 State 事件通知，默认容器外不可接收，需设置 AnnMscStateKey 注解参数 acceptable == true，
     * @param event
     */
    onStateEvent(event: MscStateEvent): void

    /**
     * MSC 容器声明周期，默认可接收，参考 MscLifecycleConstants 常量
     * 1.MSC容器 开始加载 MSC_LIFECYCLE_DLC_CONTAINER_WILL_MOUNT : msc_container_will_mount
     * 2.MSC容器 加载完成 MSC_LIFECYCLE_DLC_CONTAINER_DID_MOUNT : msc_container_did_mount
     * 3.MSC容器 开始卸载 MSC_LIFECYCLE_DLC_CONTAINER_WILL_UNMOUNT : msc_container_will_unmount
     * 4.MSC容器 卸载完成 MSC_LIFECYCLE_DLC_CONTAINER_DID_UNMOUNT : msc_container_did_unmount
     * 5.MSC容器 切换后台 MSC_LIFECYCLE_DLC_CONTAINER_BACK : msc_container_back
     * 6.MSC容器 恢复前台 MSC_LIFECYCLE_DLC_CONTAINER_FRONT : msc_container_front
     * @param event
     */
    onLifecycleEvent(event: MscLifecycleEvent): void

    /**
     * MSC Error 事件通知
     * @param event
     */
    onErrorEvent(event: MscErrorEvent): void

}
```

### 5.3 Container（容器）
MSC Engine 容器负责组件的实例化和生命周期管理。通过 MSC Engine Container，不仅能动态加载 DSL 业务逻辑，还可监听和分发组件事件，也可以采用封装组件方式与已有旧系统兼容。

``` ts
import React, {useEffect, useRef, useState} from 'react';
import {MscActionEvent, MscBuilder, MscInstance, MscLifecycleEvent, MscStateEvent, MscProvider, MscErrorEvent} from "@mortiseai/mai_msc_engine_ts_module";
import {MscEvn} from "../env/MscEvn";

/**
 * MSC Engine 容器
 * 可以通过 MscInstance 向引擎内组件发送 MscMortiseStateKeys 事件，实现与已有旧系统兼容，需设置 AnnMscStateKey 注解参数 operable == true
 * MscInstance.sendState(stateEvent: any): void;
   MscInstance.sendState({
                sender: "string|发送组件别名",
                receiver: "string|接收组件别名",
                message: "string|接收事件名称",
                model: "MscMortiseStateModel|接收事件数据模型"
            })
 * @param props
 * @constructor
 */
export function MscEngineContainer(props: any) {

    const [dsl, setDsl] = useState<string>()

    const [debug, seDebug] = useState(false)

    let mscInstance = useRef<MscInstance | null>()

    let mscDom = useRef<any>()

    useEffect(function () {

        if (!window.onerror) {
            window.onerror = function (err) {
                if(err === 'ResizeObserver loop limit exceeded') {
                    console.warn('Ignored: ResizeObserver loop limit exceeded');
                    return true;
                }
            }
        }
        if (!MscProvider.isRegistryMscEnv()) {
            MscProvider.registryMscEnv(new MscEvn())
        }

        if (props.debug) {
            seDebug(props.debug)
        }

        if (dsl != props.dsl) {
            handleDsl(props.dsl)
        }

        return () => {
            if (mscInstance.current) {
                mscInstance.current.uninstall()
                mscInstance.current = null
            }
            if (window.onerror) {
                window.onerror = null
            }
        }

    }, [props])

    const handleDsl = (dls: string) => {
        new Promise<string>(function (resolve) {
            const loadDslFun = MscProvider.MscEnv().dsl(dls)
            if (loadDslFun) {
                loadDslFun()
                resolve(dls)
            }
        }).then(function (dls) {
            setDsl(`${dls}`)
        })
    }

    const handleDom = () => {
        if (!mscInstance.current && dsl) {
            mscInstance.current = new MscBuilder(debug).dls(dsl).observer({
                handleActionEvent(event: MscActionEvent) {
                    props.listener?.onActionEvent(event)
                },
                handleStateEvent(event: MscStateEvent) {
                    props.listener?.onStateEvent(event)
                },
                handleLifecycleEvent(event: MscLifecycleEvent) {
                    props.listener?.onLifecycleEvent(event)
                },
                handleErrorEvent(event: MscErrorEvent) {
                    props.listener?.onErrorEvent(event)
                }
            }).build()
            if (props.onMscInstanceCallBack) {
                props.onMscInstanceCallBack(mscInstance.current)
            }
        }
        if (!mscDom.current) {
            mscDom.current = mscInstance.current?.install()
        }
        return mscDom.current
    }

    return (
        <div style={{width: "100vw", height: "100vh"}}>
            {dsl ? handleDom() : null}
        </div>
    )

}
```

### 5.4 Page（页面）
通过 Page 方式，可快速集成和启动引擎实例，实现 DSL 动态加载与事件监听，也可以采用封装组件方式与已有旧系统兼容。

``` ts
import React from 'react';
import ReactDom from 'react-dom';
import {useLocation} from 'react-router-dom'
import {MscEngineContainer} from "./MscEngineContainer";
import {MscEngineListener} from "./MscEngineListener";
import {MscActionEvent, MscErrorEvent, MscLifecycleEvent, MscStateEvent} from "@mortiseai/mai_msc_engine_ts_module";

/**
 * MSC Engine 页面
 * @constructor
 */
function MscEnginePage(props: any) {
	
    const location = useLocation()

    //实例化 MSC Engine 监听，实现与已有旧系统兼容
    const listener: MscEngineListener = {
        onActionEvent(event: MscActionEvent): void {
            console.log("MscEnginePage",`ActionEvent >>> ${JSON.stringify(event)}`)
        },
        onStateEvent(event: MscStateEvent): void {
            console.log("MscEnginePage",`StateEvent >>> ${JSON.stringify(event)}`)
        },
        onLifecycleEvent(event: MscLifecycleEvent): void {
            console.log("MscEnginePage",`LifecycleEvent >>> ${JSON.stringify(event)}`)
        },
        onErrorEvent(event: MscErrorEvent): void {
            console.log("MscEnginePage",`ErrorEvent >>> ${JSON.stringify(event)}`)
        }
    }

    return (
        <MscEngineContainer debug={location.state.debug} dsl={location.state.dsl} listener={listener}/>
    );
    
}

ReactDom.render(
    <MscEnginePage/>,
    document.getElementById('root')
);

```
## 6.MortiseSpecCodeEngine 项目结构说明

```
├── rules / # 规则文件夹
| ├── mai-project-review-rules.md # 代码检查清单
| ├── mai-msc-engine-rules.md # MSC 引擎规则
└── src/ # 源代码目录
| ├──msc/ # MSC Engine 核心框架
│   ├── core/ # 核心模块
│   │ ├── MscReactContainer.tsx # MSC React 容器组件
│   │ ├── MscReactListener.ts # MSC React 事件监听器
│   │ └── MscReactPage.tsx # MSC React 页面基类
│   │
│   ├── common/view/ # 公共视图组件
│   │ ├── MscBrick.tsx # MSC Brick 组件基类
│   │ ├── MscLayer.tsx # MSC Layer 组件基类
│   │ └── MscVirtual.tsx # MSC Virtual 组件基类
│   │
│   └── env/ # 环境配置
│   └── MscEnv.ts # MSC 环境配置
│   │
| ├──project/ # 业务项目目录
|    ├── msc-module / # MSC 模块目录
│       ├── msc-module-page.tsx # MSC 模块页面入口组件
│       ├── msc-modulepage.html # MSC 模块页面 HTML 模板
│       ├── msc-module-page.less # MSC 模块页面样式
│       │
│       ├── dsl/ # MSC DSL 配置
│       │ └── msc_module_dsl.ts # MSC 模块 DSL 定义
│       │
|       |── workflow/ # MSC Workflow 目录示例
|       └── MscModuleWorkflow.ts # 模块工作流实现
│       │
│       ├── view # 视图组件目录示例
│       │ └── msc-module-view/ # 模块视图组件
│       |   ├── MscModuleViewComponent.tsx # 模块视图组件 UI 实现
│       |   ├── MscModuleViewBrick.tsx # 模块视图组件实现
│       │   ├── action/ # Action 发送事件定义
│       │   │   ├── MscModuleViewActionKeys.ts # Action 发送事件
│       │   │   └── MscModuleViewActionModel.ts # Action 发送事件数据对象
│       │   └── state/ # State 接收事件定义
│       │       ├── MscModuleViewStateKeys.ts # State 接收事件
│       │       └── MscModuleViewStateModel.ts # State 接收事件数据对象
│       |   └── less/ # 样式文件
│       |       └── msc-module-view.less # 组件样式
│       │   └── mai-mcube-rules.md # 视图组件需求规则
│       │
│       ├── logic # 逻辑组件目录示例
│       │ └── msc-module-logic/ # 模块逻辑组件
│       │   ├── MscModuleLogic.ts # 组件实现
│       │   ├── action/ # Action 发送事件定义
│       │   │   ├── MscModuleLogicActionKeys.ts # Action 发送事件
│       │   │   └── MscModuleLogicActionModel.ts # Action 发送事件数据对象
│       │   └── state/ # State 接收事件定义
│       │       ├── MscModuleLogicStateKeys.ts # State 接收事件
│       │       └── MscModuleLogicStateModel.ts # State 接收事件数据对象
└──     └──  └── mai-mcube-rules.md # 逻辑组件需求规则
```