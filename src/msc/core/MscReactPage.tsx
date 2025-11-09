import React from 'react';
import {useLocation} from 'react-router-dom'
import {MscReactContainer} from "./MscReactContainer";
import {MscReactListener} from "./MscReactListener";
import {MscActionEvent, MscErrorEvent, MscLifecycleEvent, MscStateEvent} from "@mortiseai/mai_msc_engine_ts_module";

/**
 * MSC React 通用页面
 * @constructor
 */
export function MscReactPage() {

    const location = useLocation()

    const listener: MscReactListener = {
        onActionEvent(event: MscActionEvent): void {
            console.log("MscReactPage",`ActionEvent >>> ${JSON.stringify(event)}`)
        },
        onStateEvent(event: MscStateEvent): void {
            console.log("MscReactPage",`StateEvent >>> ${JSON.stringify(event)}`)
        },
        onLifecycleEvent(event: MscLifecycleEvent): void {
            console.log("MscReactPage",`LifecycleEvent >>> ${JSON.stringify(event)}`)
        },
        onErrorEvent(event: MscErrorEvent): void {
            console.log("MscReactPage",`ErrorEvent >>> ${JSON.stringify(event)}`)
        }
    }

    return (
        <MscReactContainer debug={location.state.debug} dsl={location.state.dsl} listener={listener}/>
    );

}
