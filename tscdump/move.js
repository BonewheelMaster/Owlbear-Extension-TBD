import OBR from "@owlbear-rodeo/sdk";
import * as util from "./util";
export async function moveAll() {
    const items = await OBR.scene.items.getItems();
    const npcs = util.filterNPCs(items);
    // TODO handle other grid types, namely hexes
    const dpi = await OBR.scene.grid.getDpi();
    let newPositions = {};
    for (let npc of npcs) { // This is done outside of the following because it is async.
        newPositions[npc.id] = await OBR.scene.grid.snapPosition(npc.position, 1, false, true);
        //let expendedMovement = 0;
        //while (expendedMovement < npc.meta.speed) {
        //}
        newPositions[npc.id].x += dpi;
    }
    OBR.scene.items.updateItems(npcs, (nn) => {
        for (let npc of nn) {
            const target = util.getTarget(items, npc.meta.target);
            if (target !== null) {
                npc.position = newPositions[npc.id];
            }
        }
    });
}
