import OBR, { ContextMenuContext, ContextMenuIconFilter, KeyFilter, ItemFilter }
    from "@owlbear-rodeo/sdk";

import * as state from "./state";
import * as util from "./util";

// TODO change below to correct name
const ID    = "Owlbear-Extension-TBD/io.github.bonewheelmaster";
const STATE = `${ID}/state`

function itemInfo(context : ContextMenuContext) {
    console.log(context.items);
}

function hardcodeId(context : ContextMenuContext) {
    OBR.scene.items.updateItems(context.items, (items) => {
        const npcs = util.filterNPCs(items);
        for (let npc of npcs) {
            npc.meta.target = "7c7c63a9-4a09-4632-9d8d-00bffd2ee66f";
        }
    });
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
            , filter: { roles: ["GM"] } as ContextMenuIconFilter
           }],
    onClick: (itemInfo),
};

// Requires that the token is already initialized.
const menuHardcodeId = {
    id: ID + "/hardcodeId",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/panel.svg"
            , label: "Hardcode target ID"
            , filter: { roles: ["GM"] } as ContextMenuIconFilter
           }],
    onClick: (itemInfo),
};

const menuAdd = {
    id: ID + "/menuAdd",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/panel.svg"
            , label: "Instill thought"
            , filter: { every: [ { key: "layer", value: "CHARACTER" }
                               , { key: ["metadata", STATE, "enabled"], value: true, operator: "!=" } as KeyFilter
                               ]
                      , roles: ["GM"]
                      } as ContextMenuIconFilter
           }],
    onClick: (addToken),
};

const menuRemove = {
    id: ID + "/menuRemove",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/panel.svg"
            , label: "Uninstill thought"
            , filter: { every: [ { key: "layer", value: "CHARACTER" }
                               , { key: ["metadata", STATE, "enabled"], value: true }
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
    OBR.contextMenu.create(menuHardcodeId);
}
