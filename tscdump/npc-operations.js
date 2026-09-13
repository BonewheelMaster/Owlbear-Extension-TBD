import OBR from "@owlbear-rodeo/sdk";
import * as state from "./state";
import * as util from "./util";
export function hardcodeId(context) {
    OBR.scene.items.updateItems(context.items, (items) => {
        const npcs = util.filterNPCs(items);
        for (let npc of npcs) {
            npc.meta.target = "7c7c63a9-4a09-4632-9d8d-00bffd2ee66f";
        }
    });
}
export function addToken(context) {
    OBR.scene.items.updateItems(context.items, (items) => {
        for (let item of items) {
            item.metadata[state.STATE] = state.initMeleeAI;
        }
    });
}
export function removeToken(context) {
    OBR.scene.items.updateItems(context.items, (items) => {
        for (let item of items) {
            item.metadata[state.STATE] = {};
        }
    });
}
