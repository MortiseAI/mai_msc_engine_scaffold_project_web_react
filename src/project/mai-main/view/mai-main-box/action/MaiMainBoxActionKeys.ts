import {AnnMscActionKey, AnnMscActionKeysClass, MscMortiseActionKeys} from "@mortiseai/mai_msc_engine_ts_module";

@AnnMscActionKeysClass()
export class MaiMainBoxActionKeys extends MscMortiseActionKeys {

    @AnnMscActionKey(false, "mai_main_box_click", "MaiMainBoxActionModel")
    static MAI_MAIN_BOX_CLICK = "mai_main_box_click"

}
