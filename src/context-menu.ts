import OBR, { ContextMenuContext, ContextMenuIconFilter, KeyFilter, ItemFilter }
    from "@owlbear-rodeo/sdk";

import * as state from "./state";
import * as util from "./util";

// TODO change below to correct name
const ID    = "Owlbear-Extension-TBD/io.github.bonewheelmaster";
const STATE = `${ID}/state`

export function itemInfo(context : ContextMenuContext) {
    console.log(context.items);
}

export function hardcodeId(context : ContextMenuContext) {
    OBR.scene.items.updateItems(context.items, (items) => {
        const npcs = util.filterNPCs(items);
        for (let npc of npcs) {
            npc.meta.target = "7c7c63a9-4a09-4632-9d8d-00bffd2ee66f";
        }
    });
}

export function addToken(context : ContextMenuContext) {
    OBR.scene.items.updateItems(context.items, (items) => {
        for (let item of items) {
            item.metadata[STATE] = state.initMeleeAI
        }
    });
}

export function removeToken(context : ContextMenuContext) {
    OBR.scene.items.updateItems(context.items, (items) => {
        for (let item of items) {
            item.metadata[STATE] = {}
        }
    });
}

export const NPCDisabledFilter = { every: [ { key: "layer", value: "CHARACTER" }
                                   , { key: ["metadata", STATE, "enabled"], value: true, operator: "!=" } as KeyFilter
                                   ]
                          , roles: ["GM"]
                          } as ContextMenuIconFilter

export const NPCEnabledFilter = { every: [ { key: "layer", value: "CHARACTER" }
                                  , { key: ["metadata", STATE, "enabled"], value: true }
                                  ]
                         , roles: ["GM"]
                         } as ContextMenuIconFilter

export const menuInfo = {
    id: ID + "/menuInfo",
    // TODO see if these urls can be relative
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/panel.svg"
            , label: "Info -> Console"
            , filter: { roles: ["GM"] } as ContextMenuIconFilter
           }],
    onClick: (itemInfo),
};

// Requires that the token is already initialized.
export const menuHardcodeId = {
    id: ID + "/hardcodeId",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/panel.svg"
            , label: "Hardcode target ID"
            , filter: { roles: ["GM"] } as ContextMenuIconFilter
           }],
    onClick: (hardcodeId),
};

export const menuAdd = {
    id: ID + "/menuAdd",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/panel.svg"
            , label: "Enable NPC"
            , filter: NPCDisabledFilter
           }],
    onClick: (addToken),
};


export const menuSettings = {
    id: ID + "/menuSettings",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/panel.svg"
            , label: "NPC Settings"
            , filter: NPCEnabledFilter
            }],
    embed: { url: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/settings-menu.html" },
};

export function main() {
    OBR.contextMenu.create(menuInfo);
    OBR.contextMenu.create(menuAdd);
    OBR.contextMenu.create(menuSettings);
    OBR.contextMenu.create(menuHardcodeId);
}
