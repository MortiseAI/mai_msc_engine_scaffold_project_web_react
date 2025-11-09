import React, {useEffect, useState} from "react";
import {BaseMscBrick, MscViewMortiseConfig, MscViewProxy, MscStateEvent} from "@mortiseai/mai_msc_engine_ts_module";

/**
 * 默认兜底 Brick
 */
export class MscBrick extends BaseMscBrick {

    onCreateBrick(config: MscViewMortiseConfig) {

        const proxy = new MscViewProxy(this.getWebPromise(), {
            name: config.dsl.name,
            data: config.dsl.data,
            ext: config.dsl.ext,
            style: this.getStyle(),
        })

        return <MscBrickProxyComponent key={config.dsl.name} proxy={proxy}/>
    }

}


function MscBrickProxyComponent(props: any) {

    const [install, setInstall] = useState(false)
    const [hide, setHide] = useState(false)

    const [style, setStyle] = useState()
    const [gravity, setGravity] = useState()

    const [name, setName] = useState()

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
                },
                onSaveViewState() {
                },
                onRestoreViewState(data: any) {
                }
            })
            setName(props.proxy.getName())
        }
    }

    return (
        (!install || hide) ? null :
            <div style={style} className={gravity}>
                <span style={{fontSize: "15px", color: "#000"}}>{`Def MlcBrick : ${name}`}</span>
            </div>
    )

}
