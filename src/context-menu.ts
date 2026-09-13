import OBR, { ContextMenuContext, ContextMenuIconFilter, KeyFilter, ItemFilter }
    from "@owlbear-rodeo/sdk";

import * as npcOps from "./npc-operations";
import * as state  from "./state";
import * as util   from "./util";

export const NPCDisabledFilter =
    { every: [ { key: "layer", value: "CHARACTER" }
               , { key: ["metadata", state.STATE, "enabled"], value: true, operator: "!=" } as KeyFilter
               ]
    , roles: ["GM"]
    } as ContextMenuIconFilter

export const NPCEnabledFilter =
    { every: [ { key: "layer", value: "CHARACTER" }
               , { key: ["metadata", state.STATE, "enabled"], value: true }
               ]
    , roles: ["GM"]
    } as ContextMenuIconFilter

export const menuInfo = {
    id: state.ID + "/menuInfo",
    // TODO see if these urls can be relative
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/panel.svg"
            , label: "Info -> Console"
            , filter: { roles: ["GM"] } as ContextMenuIconFilter
           }],
    onClick: ((context : ContextMenuContext) => { console.log(context.items); }),
};

// Requires that the token is already initialized.
export const menuHardcodeId = {
    id: state.ID + "/hardcodeId",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/panel.svg"
            , label: "Hardcode target ID"
            , filter: { roles: ["GM"] } as ContextMenuIconFilter
           }],
    onClick: (npcOps.hardcodeId),
};

export const menuAdd = {
    id: state.ID + "/menuAdd",
    icons: [{ icon: "https://bonewheelmaster.github.io/Owlbear-Extension-TBD/panel.svg"
            , label: "Enable NPC"
            , filter: NPCDisabledFilter
           }],
    onClick: (npcOps.addToken),
};


export const menuSettings = {
    id: state.ID + "/menuSettings",
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
