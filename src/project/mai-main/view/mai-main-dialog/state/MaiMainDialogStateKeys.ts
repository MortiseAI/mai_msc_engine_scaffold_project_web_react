import {AnnMscStateKey, AnnMscStateKeysClass, MscMortiseStateKeys} from "@mortiseai/mai_msc_engine_ts_module";

@AnnMscStateKeysClass()
export class MaiMainDialogStateKeys extends MscMortiseStateKeys {

    @AnnMscStateKey(false, false, "mai_main_dialog_open")
    static MAI_MAIN_DIALOG_OPEN = "mai_main_dialog_open"

}
