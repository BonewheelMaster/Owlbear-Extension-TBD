import * as state from "./state";
export const ID = "Owlbear-Extension-TBD/io.github.bonewheelmaster";
export const STATE = `${ID}/state`;
export function distance(p1, p2) {
    return Math.sqrt((p1.x - p1.x) ** 2 + (p2.y - p2.y) ** 2);
}
export function length(vec) {
    return distance(vec, { x: 0, y: 0 });
}
// Keep only those items which implement the NPC interface; namely, that have
// metadata that is of the correct type.
export function filterNPCs(items) {
    const npcs = [];
    for (const item of items) {
        if (!state.validMetadata(item.metadata[STATE])) {
            continue;
        }
        npcs.push({ ...item, meta: item.metadata[STATE] });
    }
    return npcs;
}
// Given all items and a target id, return the item that id corresponds to.
export function getTarget(items, targetId) {
    const targets = items.filter((item) => item.id == targetId);
    if (targets.length == 1) {
        return targets[0];
    }
    else {
        return null;
    }
}
// Get the text label from an item. If the item has none, return "".
export function getTextLabel(item) {
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
// Get the name of an item, which is its text label if it has one.
export function getName(item) {
    const label = getTextLabel(item);
    if (label == "") {
        return `${item.name}`;
    }
    else {
        return `${label}`;
    }
}
