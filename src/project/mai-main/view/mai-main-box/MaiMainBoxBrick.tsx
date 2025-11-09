import React, {useEffect, useState} from "react";
import {AnnMscAction, AnnMscState, BaseMscBrick, MscViewMortiseConfig, MscViewProxy, MscStateEvent} from "@mortiseai/mai_msc_engine_ts_module";
import {MaiMainBoxActionKeys} from "./action/MaiMainBoxActionKeys";
import {MaiMainBoxStateKeys} from "./state/MaiMainBoxStateKeys";
import {MaiMainBoxComponent} from "./MaiMainBoxComponent";
import {MaiMainBoxActionModel} from "./action/MaiMainBoxActionModel";

@AnnMscAction(true, MaiMainBoxActionKeys)
@AnnMscState(true, MaiMainBoxStateKeys)
export class MaiMainBoxBrick extends BaseMscBrick {

    onCreateBrick(config: MscViewMortiseConfig) {

        const proxy = new MscViewProxy(this.getWebPromise(), {
            name: config.dsl.name,
            data: config.dsl.data,
            ext: config.dsl.ext,
            style: this.getStyle(),
        })

        const _this = this

        return <MaiMainBoxBrickProxyComponent key={config.dsl.name} proxy={proxy} sender={
            {
                sendAction(event: any) {
                    _this.sendActionEvent(event.message, event.model, event.receiver, event.data, event.callback)
                }
            }
        }/>

    }

}

function MaiMainBoxBrickProxyComponent(props: any) {

    const [install, setInstall] = useState(false)
    const [hide, setHide] = useState(false)

    const [style, setStyle] = useState()
    const [gravity, setGravity] = useState()

    useEffect(function () {
        if (props.proxy) {
            Promise.resolve().then(() => initProxyComponent())
        }
    }, [props])

    const initProxyComponent = () => {
        if (props.proxy) {
            props.proxy.registryCallBack({
                onInstall() {
                    setStyle(props.proxy.getStyle())
                    setGravity(props.proxy.getGravity())
                    setHide(props.proxy.getHide())
                    setInstall(true)
                },
                onUninstall() {
                    setInstall(false)
                },
                onRefresh() {
                    setStyle(props.proxy.getStyle())
                    setGravity(props.proxy.getGravity())
                },
                onHiddenChange(hide: boolean) {
                    setHide(hide)
                },
                onStateEvent(event: MscStateEvent) {
                    switch (event.getMessage()) {
                        default:
                            break
                    }
                },
                onSaveViewState() {
                },
                onRestoreViewState(data: any) {
                }
            })
        }
    }

    const handleMainBoxClick = () => {
        const model = new MaiMainBoxActionModel()
        model.content = "Hello World"
        props.sender.sendAction({message: MaiMainBoxActionKeys.MAI_MAIN_BOX_CLICK, model: model})
    }

    return (
        (!install || hide) ? null :
            <div style={style} className={gravity}>
                <MaiMainBoxComponent style={style}
                                     handleMainBoxClick={handleMainBoxClick}/>
            </div>
    )

}
