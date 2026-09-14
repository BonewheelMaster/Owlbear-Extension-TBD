import OBR from "@owlbear-rodeo/sdk";
import * as state from "./state";
import * as util from "./util";
export function hardcodeIds(items) {
    OBR.scene.items.updateItems(items, (items) => {
        const npcs = util.filterNPCs(items);
        for (let npc of npcs) {
            npc.meta.target = "7c7c63a9-4a09-4632-9d8d-00bffd2ee66f";
        }
    });
}
export function addTokens(items) {
    updateTokens(state.initMeleeAI, items);
}
export function removeTokens(items) {
    OBR.scene.items.updateItems(items, (items) => {
        for (let item of items) {
            item.metadata[state.STATE] = {};
        }
    });
}
export function updateTokens(newState, items) {
    OBR.scene.items.updateItems(items, (items) => {
        for (let item of items) {
            item.metadata[state.STATE] = newState;
        }
    });
}
export function changeType(newType, items) {
    OBR.scene.items.updateItems(items, (items) => {
        const npcs = util.filterNPCs(items);
        for (let npc of npcs) {
            // Don't want the other settings to change for no good reason.
            if (npc.meta.kind == newType) {
                continue;
            }
            console.log(newType);
            console.log(npc);
            switch (newType) {
                case state.MELEE:
                    npc.meta = state.initMeleeAI;
                    break;
                case state.RANGED:
                    npc.meta = state.initRangedAI;
                    break;
            }
        }
    });
}
