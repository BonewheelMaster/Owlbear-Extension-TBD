import OBR from "@owlbear-rodeo/sdk";
import * as state from "./state";
import * as util from "./util";
function getTextLabel(item) {
    if ("text" in item
        && typeof item.text == "object"
        && item.text != null
        && "plainText" in item.text
        && typeof item.text.plainText == "string") {
        return item.text.plainText;
    }
    else {
        return "";
    }
}
function getName(item) {
    const label = getTextLabel(item);
    if (label == "") {
        return `${item.name}`;
    }
    else {
        return `${label}`;
    }
}
const panelHTML = document.querySelector("#panel");
if (panelHTML != null) {
    panelHTML.innerHTML = '<ul id="list"></ul>';
}
const panel = (items) => {
    const npcs = util.filterNPCs(items);
    const nodes = [];
    for (const npc of npcs) {
        const node = document.createElement("li");
        const name = getName(npc);
        const meta = npc.meta;
        switch (meta.kind) {
            case state.MELEE:
                node.innerHTML = `
                    <p>${name}</p>

                    <ul>
                        <li>using: melee</li>
                        <li>speed: ${meta.speed}</li>
                        <li>target id: ${meta.target}</li>
                    </ul>
                `;
                break;
            case state.RANGED:
                node.innerHTML = `
                    <p>${name}</p>

                    <ul>
                        <li>using: ranged</li>
                        <li>speed: ${meta.speed}</li>
                        <li>target id: ${meta.target}</li>
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
OBR.onReady(() => { OBR.scene.items.onChange(panel); });
