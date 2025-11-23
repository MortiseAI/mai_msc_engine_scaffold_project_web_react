import React, {useEffect, useRef, useState} from 'react';
import {MscActionEvent, MscBuilder, MscInstance, MscLifecycleEvent, MscStateEvent, MscProvider, MscErrorEvent} from "@mortiseai/mai_msc_engine_ts_module";
import {MscEnv} from "../env/MscEnv";

/**
 * MSC React 通用容器
 * @param props
 * @constructor
 */
export function MscReactContainer(props: any) {

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
            MscProvider.registryMscEnv(new MscEnv())
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

