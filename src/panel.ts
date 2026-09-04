import OBR, { Item, Image } from "@owlbear-rodeo/sdk";

import * as state from "./state";


function getTextLabel(item : Item) {
    if ( "text" in item 
         && typeof item.text == "object"
         && item.text != null
         && "plainText" in item.text
         && typeof item.text.plainText == "string"
       ) { return item.text.plainText; }
    else { return ""; }
}

const panelHTML = document.querySelector("#panel")
if (panelHTML != null) { panelHTML.innerHTML = '<ul id="list"></ul>'; }

// TODO change below to correct name
const ID    = "Owlbear-Extension-TBD/io.github.bonewheelmaster";
const STATE = `${ID}/state`

const panel = (items : (Item | Image)[]) => {
    const relevantItems = [];
    for (const item of items) {
        const metadata = item.metadata[STATE];
        if ( typeof(metadata) === "object" 
          && metadata != null
          && "enabled" in metadata
          && metadata.enabled == true
        ) { relevantItems.push(item); }
    }
    const nodes = [];
    for (const item of relevantItems) {
        const node = document.createElement("li");

        const label = getTextLabel(item);
        var name = "";
        if (label == "") { var name = `${item.name}`; }
        else             { var name = `${label}`; }

        const meta = item.metadata[STATE]
        if (!state.validMetadata(meta)) { continue; }
        switch (meta.kind) {
            case state.MELEE: 
                node.innerHTML = `
                    <p>${name}</p>

                    <ol>
                        <li>speed: ${meta.speed}</li>
                        <li>target id: ${meta.target}</li>
                    </ol>
                `;
                break;
            case state.RANGED: 
                node.innerHTML = `
                    <p>${name}</p>

                    <ol>
                        <li>speed: ${meta.speed}</li>
                        <li>target id: ${meta.target}</li>
                        <li>range: ${meta.range}</li>
                    </ol>
                `;
                break;
        }

        nodes.push(node);
    }
    const list = document.querySelector("#list");
    if (list != null) { list.replaceChildren(...nodes); }
};
OBR.onReady(() => { OBR.scene.items.onChange(panel); });
