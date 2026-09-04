import OBR, { Item } from "@owlbear-rodeo/sdk";

import * as state from "./state";

const panelHTML = document.querySelector("#panel")
if (panelHTML != null) { panelHTML.innerHTML = '<ul id="list"></ul>'; }

const ID    = "Owlbear-Extension-TBD/io.github.bonewheelmaster";
const STATE = `${ID}/state`

const panel = (items : Item[]) => {
    const relevantItems = [];
    for (const item of items) {
        const metadata = item.metadata[STATE];
        if ( typeof(metadata) === "object" 
            && metadata != null
            && "enabled" in metadata
            && metadata.enabled == true
        ) { relevantItems.push({ name: item.name }); }
    }
    const nodes = [];
    for (const item of relevantItems) {
        const node = document.createElement("li");
        node.innerHTML = `${item.name}`;
        nodes.push(node);
    }
    const list = document.querySelector("#list");
    if (list != null) { list.replaceChildren(...nodes); }
};
OBR.onReady(() => { OBR.scene.items.onChange(panel); });
