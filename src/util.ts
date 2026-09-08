import OBR, { Item } from "@owlbear-rodeo/sdk";

import * as state from "./state";

export const ID    = "Owlbear-Extension-TBD/io.github.bonewheelmaster";
export const STATE = `${ID}/state`

export function filterNPCs(items: Item[]) : state.NPC[] {
    const npcs = [];

    for (const item of items) {
        if (! state.validMetadata(item.metadata[STATE])) { continue; }
        npcs.push({ ...item, meta: item.metadata[STATE] });
    }
    return npcs;
}

export function getTarget(items: Item[], targetId: string) : Item | null {
    const targets = items.filter((item) => item.id == targetId);

    if (targets.length == 1) {
        return targets[0];
    } else { return null; }
}

export function getTextLabel(item : Item) {
    if ( "text" in item
         && typeof item.text == "object"
         && item.text != null
         && "plainText" in item.text
         && typeof item.text.plainText == "string"
       ) { return item.text.plainText; }
    else { return ""; }
}

export function getName(item : Item) {
    const label = getTextLabel(item);
    if (label == "") { return `${item.name}`; }
    else             { return `${label}`; }
}
