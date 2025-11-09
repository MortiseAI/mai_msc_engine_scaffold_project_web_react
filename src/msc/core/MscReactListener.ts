import {MscActionEvent, MscStateEvent, MscLifecycleEvent, MscErrorEvent} from "@mortiseai/mai_msc_engine_ts_module";

/**
 * MSC 容器 事件回调接口
 */
export interface MscReactListener {

    /**
     * MSC View/Logic/Workflow 发送 Action 事件通知，默认容器外不可接收，需 设置 AnnMscActionKey 注解参数 acceptable == true，
     * @param event
     */
    onActionEvent(event: MscActionEvent): void

    /**
     * MSC View/Logic/Workflow 接收 State 事件通知，默认容器外不可接收，需 设置 AnnMscStateKey 注解参数 acceptable == true，
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
