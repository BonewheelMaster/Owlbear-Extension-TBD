import OBR, { Item } from "@owlbear-rodeo/sdk";

import * as state from "./state";

export const ID    = "Owlbear-Extension-TBD/io.github.bonewheelmaster";
export const STATE = `${ID}/state`

export function filterNPCs(items: Item[]) : state.NPC[] {
    var npcs = [];

    for (const item of items) {
        if (! state.validMetadata(item.metadata[STATE])) { continue; }
        npcs.push({ ...item, meta: item.metadata[STATE] });
    }
    return npcs;
}
