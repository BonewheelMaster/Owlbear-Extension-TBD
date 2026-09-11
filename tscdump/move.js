import OBR from "@owlbear-rodeo/sdk";
import * as util from "./util";
export async function moveAll() {
    const items = await OBR.scene.items.getItems();
    const npcs = util.filterNPCs(items);
    let newPositions = {};
    for (let npc of npcs) { // This is done outside of the following because it is async.
        newPositions[npc.id] = await OBR.scene.grid.snapPosition(npc.position, 1, false, true);
    }
    OBR.scene.items.updateItems(npcs, (nn) => {
        for (let npc of nn) {
            //        const pos1 = npc.position;
            //        const target = util.getTarget(items, npc.meta.target);
            //        if (target !== null) { 
            //            const dist = await OBR.scene.grid.getDistance(pos1, target.position)
            //            console.log(`${util.getName(npc)}: ${dist}`);
            //        }
            npc.position = newPositions[npc.id];
        }
    });
}
