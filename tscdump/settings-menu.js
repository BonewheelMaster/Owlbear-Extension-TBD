import OBR from "@owlbear-rodeo/sdk";
import * as npcOps from "./npc-operations";
import * as state from "./state";
import * as util from "./util";
export async function getSelectedItems() {
    const items = await OBR.scene.items.getItems();
    const selItemIds = await OBR.player.getSelection();
    if (selItemIds === undefined) {
        return [];
    }
    return selItemIds
        .map((id) => { return util.getTarget(items, id); })
        .filter((item) => { return item !== null; });
}
export async function removeSelected() {
    const selItems = await getSelectedItems();
    npcOps.removeTokens(selItems);
}
// Get the current settings of all selected NPCs.
//
// The following describes how conflicts are resolved:
//      If there are no conflicts (all selected NPCs have the same values set),
//      then this will return those values.
//      If there are conflicts but all NPCs are the same AI type, this will
//      return that type.
//      Otherwise, this will return "Disagreed". Also returns if nothing is selected.
export async function getSelectedNPCSettings() {
    const selItems = await getSelectedItems();
    // Only the NPCs are cared about because this menu will not appear if a
    // non-npc is included in the selection.
    const selNPCs = util.filterNPCs(selItems);
    if (selNPCs.length >= 1) {
        const refNPCAI = selNPCs[0].meta;
        if (selNPCs.every((npc) => {
            return state.NPCAIEqual(npc.meta, refNPCAI);
        })) {
            return refNPCAI;
        }
        if (selNPCs.every((npc) => { return npc.meta.kind == refNPCAI.kind; })) {
            return refNPCAI.kind;
        }
    }
    return "Disagreed";
}
const menu = async (items) => {
    const settings = await getSelectedNPCSettings();
    console.log(settings);
};
const disableButton = document.querySelector("#disableButton");
if (disableButton != null) {
    disableButton.addEventListener("click", removeSelected);
}
OBR.scene.items.onChange(menu);
