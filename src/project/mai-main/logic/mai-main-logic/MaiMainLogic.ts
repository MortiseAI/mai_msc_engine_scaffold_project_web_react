import {AnnMscAction, AnnMscSidecar, AnnMscState, MscLogic, MscStateEvent} from "@mortiseai/mai_msc_engine_ts_module";
import {MaiMainLogicActionKeys} from "./action/MaiMainLogicActionKeys";
import {MaiMainLogicStateKeys} from "./state/MaiMainLogicStateKeys";

@AnnMscAction(true, MaiMainLogicActionKeys)
@AnnMscState(true, MaiMainLogicStateKeys)
@AnnMscSidecar()
export class MaiMainLogic extends MscLogic {

    onAttach() {
        super.onAttach();
    }

    onInstall() {
        super.onInstall();
    }

    onDetach() {
        super.onDetach();
    }

    handleStateEvent(event: MscStateEvent) {
        switch (event.getMessage()) {
            default:
                super.handleStateEvent(event);
                break
        }
    }

}
