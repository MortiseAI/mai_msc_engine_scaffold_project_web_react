import {IMscEnv} from "@mortiseai/mai_msc_engine_ts_module";
import {MscBrick} from "../common/view/MscBrick";
import {MscLayer} from "../common/view/MscLayer";
import {MscVirtual} from "../common/view/MscVirtual";
import {mai_main_dsl} from "../../project/mai-main/dsl/mai_main_dsl";
import {MaiMainBoxBrick} from "../../project/mai-main/view/mai-main-box/MaiMainBoxBrick";
import {MaiMainBoxActionKeys} from "../../project/mai-main/view/mai-main-box/action/MaiMainBoxActionKeys";
import {MaiMainBoxStateKeys} from "../../project/mai-main/view/mai-main-box/state/MaiMainBoxStateKeys";
import {MaiMainDialogVirtual} from "../../project/mai-main/view/mai-main-dialog/MaiMainDialogVirtual";
import {MaiMainDialogActionKeys} from "../../project/mai-main/view/mai-main-dialog/action/MaiMainDialogActionKeys";
import {MaiMainDialogStateKeys} from "../../project/mai-main/view/mai-main-dialog/state/MaiMainDialogStateKeys";
import {MaiMainLogic} from "../../project/mai-main/logic/mai-main-logic/MaiMainLogic";
import {MaiMainLogicActionKeys} from "../../project/mai-main/logic/mai-main-logic/action/MaiMainLogicActionKeys";
import {MaiMainLogicStateKeys} from "../../project/mai-main/logic/mai-main-logic/state/MaiMainLogicStateKeys";
import {MaiMainWorkflow} from "../../project/mai-main/workflow/MaiMainWorkflow";

export class MscEvn implements IMscEnv {

    private _dsl: any = {
        mai_main_dsl,
    }

    private _view: any = {
        /** common **/
        MscBrick,
        MscLayer,
        MscVirtual,
        /** mai-main **/
        MaiMainBoxBrick,
        MaiMainDialogVirtual,
    }

    private _logic: any = {
        /** mai-main **/
        MaiMainLogic,
    }

    private _workflow: any = {
        /** mai-main **/
        MaiMainWorkflow,
    }

    private _actionKeys: any = {
        /** mai-main **/
        MaiMainBoxActionKeys,
        MaiMainDialogActionKeys,
        MaiMainLogicActionKeys,
    }

    private _stateKeys: any = {
        /** mai-main **/
        MaiMainBoxStateKeys,
        MaiMainDialogStateKeys,
        MaiMainLogicStateKeys,
    }

    private _sidecar: any = {}

    appId(): string {
        return "";
    }

    view(key: string): any {
        return this._view[key]
    }

    logic(key: string): any {
        return this._logic[key]
    }

    workflow(key: string): any {
        return this._workflow[key]
    }

    dsl(key: string): any {
        return this._dsl[key]
    }

    actionKeys(key: string): any {
        return this._actionKeys[key]
    }

    stateKeys(key: string): any {
        return this._stateKeys[key]
    }

    sidecar(key: string): any {
        return this._sidecar[key]
    }

}
