import React from "react";
import ReactDom from 'react-dom';
import "./mai-main-page.less"
import "../../../index.css"
import {MscActionEvent, MscErrorEvent, MscLifecycleEvent, MscStateEvent} from "@mortiseai/mai_msc_engine_ts_module";
import {MscReactListener} from "../../msc/core/MscReactListener";
import {MscReactContainer} from "../../msc/core/MscReactContainer";

function MaiMainPage(props: any) {

    const listener: MscReactListener = {
        onActionEvent(event: MscActionEvent): void {
            console.log("MaiMainPage", `ActionEvent >>> ${JSON.stringify(event)}`)
        },
        onStateEvent(event: MscStateEvent): void {
            console.log("MaiMainPage", `StateEvent >>> ${JSON.stringify(event)}`)
        },
        onLifecycleEvent(event: MscLifecycleEvent): void {
            console.log("MaiMainPage", `LifecycleEvent >>> ${JSON.stringify(event)}`)
        },
        onErrorEvent(event: MscErrorEvent): void {
            console.log("MaiMainPage", `ErrorEvent >>> ${JSON.stringify(event)}`)
        }
    }

    return <MscReactContainer debug={false} dsl={"mai_main_dsl"} listener={listener}/>
}

ReactDom.render(
    <MaiMainPage/>,
    document.getElementById('root')
);
