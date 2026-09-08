import * as state from "./state";
export const ID = "Owlbear-Extension-TBD/io.github.bonewheelmaster";
export const STATE = `${ID}/state`;
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
