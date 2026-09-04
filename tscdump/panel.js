import OBR from "@owlbear-rodeo/sdk";
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
const panelHTML = document.querySelector("#panel");
if (panelHTML != null) {
    panelHTML.innerHTML = '<ul id="list"></ul>';
}
const ID = "Owlbear-Extension-TBD/io.github.bonewheelmaster";
const STATE = `${ID}/state`;
const panel = (items) => {
    const relevantItems = [];
    for (const item of items) {
        const metadata = item.metadata[STATE];
        if (typeof (metadata) === "object"
            && metadata != null
            && "enabled" in metadata
            && metadata.enabled == true) {
            relevantItems.push(item);
        }
    }
    const nodes = [];
    for (const item of relevantItems) {
        const node = document.createElement("li");
        const label = getTextLabel(item);
        if (label == "") {
            node.innerHTML = `${item.name}`;
        }
        else {
            node.innerHTML = `${label}`;
        }
        nodes.push(node);
    }
    const list = document.querySelector("#list");
    if (list != null) {
        list.replaceChildren(...nodes);
    }
};
OBR.onReady(() => { OBR.scene.items.onChange(panel); });
