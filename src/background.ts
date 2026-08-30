//import OBR from "@owlbear-rodeo/sdk";
import OBR, { ContextMenuContext } from "@owlbear-rodeo/sdk";

// TODO change below to correct name
const ID = "Owlbear-Extension-TBD/io.github.bonewheelmaster";
const STATE_TAG = `${ID}/state`

function addToken(context : ContextMenuContext) {
    OBR.scene.items.updateItems(context.items, (items) => {
        for (let item of items) {
            item.metadata[STATE_TAG] = {
                "enabled": true
            }
        }
    });
}
function removeToken(context : ContextMenuContext) {
    OBR.scene.items.updateItems(context.items, (items) => {
        for (let item of items) {
            item.metadata[STATE_TAG] = {}
        }
    });
}

const menuAdd = {
    id: ID,
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/icon.png", label: "Instill thought" }],
    onClick: (addToken),
};

const menuRemove = {
    id: ID,
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/icon.png"
            , label: "Uninstill thought"
            , filter: { every: [ { key: "layer", value: "CHARACTER" }
                               , { key: "metadata", value: { STATE_TAG: { "enabled": true } } }
                               ] }
            }],
    onClick: (removeToken),
};

OBR.onReady(() => {
    OBR.contextMenu.create(menuAdd);
    OBR.contextMenu.create(menuRemove);
})
