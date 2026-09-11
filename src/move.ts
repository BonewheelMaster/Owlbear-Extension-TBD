import OBR, { Vector2 } from "@owlbear-rodeo/sdk";

import * as state from "./state";
import * as util from "./util";

export async function moveAll() {
    const items = await OBR.scene.items.getItems();
    const npcs = util.filterNPCs(items);
    
    // TODO handle other grid types, namely hexes
    // NOTE Beeline strategy
    // TODO handle collision
    const dpi = await OBR.scene.grid.getDpi();
    let newPositions : Record<string, Vector2> = {};
    for (let npc of npcs) { // This is done outside of the following because it is async.
        newPositions[npc.id] = await OBR.scene.grid.snapPosition(npc.position, 1, false, true);
        const target = util.getTarget(items, npc.meta.target);
        if (target === null) { continue; }

        // FIXME: if speed is not a multiple of 5 this will move more than allowed.
        let expendedMovement = 0;
        while (expendedMovement < npc.meta.speed 
            && util.distance(newPositions[npc.id], target.position) >= 2*dpi) { // TODO same as below
            const angle = Math.atan2( newPositions[npc.id].y - target.position.y
                                    , newPositions[npc.id].x - target.position.x);
            newPositions[npc.id].x -= util.round(dpi * Math.cos(angle), dpi);
            newPositions[npc.id].y -= util.round(dpi * Math.sin(angle), dpi);
            expendedMovement += 5 // TODO hardcoded value for grid scale
        }
    }
    OBR.scene.items.updateItems(npcs, (nn) => {
        for (let npc of nn) {
            const target = util.getTarget(items, npc.meta.target);
            if (target === null) { continue; }
            npc.position = newPositions[npc.id];
        }
    });
}
