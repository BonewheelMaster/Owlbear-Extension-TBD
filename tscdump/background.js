//import OBR from "@owlbear-rodeo/sdk";
import OBR from "@owlbear-rodeo/sdk";
// TODO change below to correct name
const ID = "Owlbear-Extension-TBD/io.github.bonewheelmaster";
const STATE_TAG = `${ID}/state`;
const META = "metadata." + STATE_TAG;
function addToken(context) {
    OBR.scene.items.updateItems(context.items, (items) => {
        for (let item of items) {
            item.metadata[STATE_TAG] = {
                "enabled": true
            };
        }
    });
}
function removeToken(context) {
    OBR.scene.items.updateItems(context.items, (items) => {
        for (let item of items) {
            item.metadata[STATE_TAG] = {};
        }
    });
}
const menuAdd = {
    id: ID + "/menuAdd",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/popover.svg",
            label: "Instill thought",
            filter: { every: [{ key: "layer", value: "CHARACTER" },
                    { key: "roles", value: "GM" }
                    // Needed because the operator key throws a typeerror otherwise  VV
                    ,
                    { key: META + ".enabled", value: true, operator: "!=" }
                ] }
        }],
    onClick: (addToken),
};
const menuRemove = {
    id: ID + "/menuRemove",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/icon.png",
            label: "Uninstill thought",
            filter: { every: [{ key: "layer", value: "CHARACTER" },
                    { key: "roles", value: "GM" },
                    { key: META + ".enabled", value: true }
                ] }
        }],
    onClick: (removeToken),
};
OBR.onReady(() => {
    OBR.contextMenu.create(menuAdd);
    OBR.contextMenu.create(menuRemove);
});
