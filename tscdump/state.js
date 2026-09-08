export const MELEE = "MELEE";
export const RANGED = "RANGED";
export const initMeleeAI = {
    kind: MELEE,
    enabled: true,
    speed: 30,
    target: "7c7c63a9-4a09-4632-9d8d-00bffd2ee66f", // TODO Tmp
};
export const initRangedAI = {
    kind: RANGED,
    enabled: true,
    speed: 30,
    target: "",
    range: 60,
};
// Determine if the given object conforms to the NPCAI interface.
export function validMetadata(meta) {
    if (typeof meta == "object"
        && "kind" in meta) {
        switch (meta.kind) {
            case MELEE:
                return ("enabled" in meta
                    && typeof meta.enabled == "boolean"
                    && "speed" in meta
                    && typeof meta.speed == "number"
                    && "target" in meta
                    && typeof meta.target == "string");
            case RANGED:
                return ("enabled" in meta
                    && typeof meta.enabled == "boolean"
                    && "speed" in meta
                    && typeof meta.speed == "number"
                    && "target" in meta
                    && typeof meta.target == "string"
                    && "range" in meta
                    && typeof meta.range == "number");
            default: return false;
        }
    }
    else {
        return false;
    }
}
