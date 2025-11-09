import {MscActionEvent, MscStateEvent, MscWorkflow} from "@mortiseai/mai_msc_engine_ts_module";
import {MaiMainBoxActionKeys} from "../view/mai-main-box/action/MaiMainBoxActionKeys";
import {MaiMainDialogStateKeys} from "../view/mai-main-dialog/state/MaiMainDialogStateKeys";
import {MaiMainDialogStateModel} from "../view/mai-main-dialog/state/MaiMainDialogStateModel";

export class MaiMainWorkflow extends MscWorkflow {

    handleActionEvent(event: MscActionEvent) {
        switch (event.getSender()) {
            case "MaiMainBox":
                this.handleMaiMainBox(event)
                break
            case "MaiMainDialog":
                this.handleMaiMainDialog(event)
                break
            case "MaiMainLogic":
                this.handleMaiMainLogic(event)
                break
            default:
                super.handleActionEvent(event);
                break
        }
    }

    handleMaiMainBox(event: MscActionEvent) {
        switch (event.getMessage()) {
            case MaiMainBoxActionKeys.MAI_MAIN_BOX_CLICK:
                const model1 = new MaiMainDialogStateModel()
                model1.content = event.getModel().content
                const event1 = MscStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiMainDialog")
                    .setMessage(MaiMainDialogStateKeys.MAI_MAIN_DIALOG_OPEN)
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
                break
        }
    }

    handleMaiMainDialog(event: MscActionEvent) {
    }

    handleMaiMainLogic(event: MscActionEvent) {
    }

}
