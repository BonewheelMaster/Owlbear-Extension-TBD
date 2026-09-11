import OBR from "@owlbear-rodeo/sdk";

import * as state from "./state";
import * as util from "./util";

export async function moveAll() {
    const items = await OBR.scene.items.getItems();
    const npcs = util.filterNPCs(items);
    console.log(npcs);
}
