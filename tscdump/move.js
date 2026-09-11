import OBR from "@owlbear-rodeo/sdk";
import * as util from "./util";
export async function moveAll() {
    const items = await OBR.scene.items.getItems();
    const npcs = util.filterNPCs(items);
    for (let npc of npcs) {
        const pos1 = npc.position;
        const target = util.getTarget(items, npc.meta.target);
        if (target !== null) {
            const dist = await OBR.scene.grid.getDistance(pos1, target.position);
            console.log(`${util.getName(npc)}: ${dist}`);
        }
    }
}
