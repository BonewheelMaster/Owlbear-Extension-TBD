import OBR from "@owlbear-rodeo/sdk";
import * as state from "./state";
import * as util from "./util";
function testFunc() {
    console.log("button");
}
const panel = (items) => {
    const npcs = util.filterNPCs(items);
    const nodes = [];
    for (const npc of npcs) {
        const node = document.createElement("li");
        const name = util.getName(npc);
        const meta = npc.meta;
        const target = util.getTarget(items, meta.target);
        const targetStr = target != null ? `Target: ${util.getName(target)}` : "No target";
        switch (meta.kind) {
            case state.MELEE:
                node.innerHTML = `
                    <p>${name}</p>

                    <ul>
                        <li>using: melee</li>
                        <li>speed: ${meta.speed}</li>
                        <li>${targetStr}</li>
                    </ul>
                `;
                break;
            case state.RANGED:
                node.innerHTML = `
                    <p>${name}</p>

                    <ul>
                        <li>using: ranged</li>
                        <li>speed: ${meta.speed}</li>
                        <li>${targetStr}</li>
                        <li>range: ${meta.range}</li>
                    </ul>
                `;
                break;
        }
        nodes.push(node);
    }
    const list = document.querySelector("#list");
    if (list != null) {
        list.replaceChildren(...nodes);
    }
};
const buttonHTML = document.querySelector("#button");
if (buttonHTML != null) {
    buttonHTML.addEventListener("click", testFunc);
}
const panelHTML = document.querySelector("#panel");
if (panelHTML != null) {
    panelHTML.innerHTML = '<ul id="list"></ul>';
}
OBR.onReady(() => { OBR.scene.items.onChange(panel); });
