import OBR from "@owlbear-rodeo/sdk";
import * as util from "./util";
export async function moveAll() {
    const items = await OBR.scene.items.getItems();
    const npcs = util.filterNPCs(items);
    // TODO handle other grid types, namely hexes
    // NOTE Beeline strategy
    // TODO handle collision
    const dpi = await OBR.scene.grid.getDpi();
    let newPositions = {};
    for (let npc of npcs) { // This is done outside of the following because it is async.
        newPositions[npc.id] = await OBR.scene.grid.snapPosition(npc.position, 1, false, true);
        //let expendedMovement = 0;
        //while (expendedMovement < npc.meta.speed) {
        //}
        const target = util.getTarget(items, npc.meta.target);
        if (target === null) {
            continue;
        }
        const angle = Math.atan2(npc.position.y - target.position.y, npc.position.x - target.position.x);
        newPositions[npc.id].x -= dpi * Math.cos(angle);
        newPositions[npc.id].y -= dpi * Math.sin(angle);
    }
    OBR.scene.items.updateItems(npcs, (nn) => {
        for (let npc of nn) {
            const target = util.getTarget(items, npc.meta.target);
            if (target === null) {
                continue;
            }
            npc.position = newPositions[npc.id];
        }
    });
}
