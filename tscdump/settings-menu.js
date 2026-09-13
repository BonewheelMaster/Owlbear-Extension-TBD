import OBR from "@owlbear-rodeo/sdk";
import * as npcOps from "./npc-operations";
import * as util from "./util";
export async function removeSelected() {
    const items = await OBR.scene.items.getItems();
    const selItemIds = await OBR.player.getSelection();
    if (selItemIds === undefined) {
        return;
    }
    const selItems = selItemIds
        .map((id) => { return util.getTarget(items, id); })
        .filter((item) => { return item !== null; });
    npcOps.removeToken({ items: selItems, selectionBounds: util.emptyBoundingBox });
    console.log("Test");
}
const disableButton = document.querySelector("#disableButton");
if (disableButton != null) {
    disableButton.addEventListener("click", removeSelected);
}
