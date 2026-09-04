import OBR, { ContextMenuContext, ContextMenuIconFilter, KeyFilter, ItemFilter }
    from "@owlbear-rodeo/sdk";

import * as state from "./state";

// TODO change below to correct name
const ID    = "Owlbear-Extension-TBD/io.github.bonewheelmaster";
const STATE = `${ID}/state`

function itemInfo(context : ContextMenuContext) {
    console.log(context.items);
}

function addToken(context : ContextMenuContext) {
    OBR.scene.items.updateItems(context.items, (items) => {
        for (let item of items) {
            item.metadata[STATE] = state.initMeleeAI
        }
    });
}

function removeToken(context : ContextMenuContext) {
    OBR.scene.items.updateItems(context.items, (items) => {
        for (let item of items) {
            item.metadata[STATE] = {}
        }
    });
}

const menuInfo = {
    id: ID + "/menuInfo",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/panel.svg"
            , label: "Info -> Console"
            , filter: { roles: ["GM"] } as ContextMenuIconFilter // Ditto above, and same below
           }],
    onClick: (itemInfo),
};

const menuAdd = {
    id: ID + "/menuAdd",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/panel.svg"
            , label: "Instill thought"
            , filter: { every: [ { key: "layer", value: "CHARACTER" }
                               // Needed because the operator key throws a typeerror otherwise  VV
                               , { key: ["metadata", STATE], value: {}, operator: "!=" } as KeyFilter
                               ]
                      , roles: ["GM"]
                      } as ContextMenuIconFilter // Ditto above, and same below
           }],
    onClick: (addToken),
};

const menuRemove = {
    id: ID + "/menuRemove",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/panel.svg"
            , label: "Uninstill thought"
            , filter: { every: [ { key: "layer", value: "CHARACTER" }
                               , { key: ["metadata", STATE], value: {} }
                               ]
                      , roles: ["GM"]
                      } as ContextMenuIconFilter
            }],
    onClick: (removeToken),
};

export function main() {
    OBR.contextMenu.create(menuInfo);
    OBR.contextMenu.create(menuAdd);
    OBR.contextMenu.create(menuRemove);
}
