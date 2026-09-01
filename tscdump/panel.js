import OBR from "@owlbear-rodeo/sdk";
const ID = "Owlbear-Extension-TBD/io.github.bonewheelmaster";
const STATE = `${ID}/state`;
document.documentElement.innerHTML = `
    <div>
        <ul id="list"></ul>
    </div>
`;
const panel = (items) => {
    const relevantItems = [];
    for (const item of items) {
        const metadata = item.metadata[STATE];
        if (typeof (metadata) === "object"
            && metadata != null
            && "enabled" in metadata
        //&& metadata.enabled == true
        ) {
            relevantItems.push({ name: item.name });
        }
    }
    const nodes = [];
    for (const item of relevantItems) {
        const node = document.createElement("li");
        node.innerHTML = `${item.name}`;
        nodes.push(node);
    }
    const list = document.querySelector("#list");
    if (list != null) {
        list.replaceChildren(...nodes);
    }
};
OBR.scene.items.onChange(panel);
