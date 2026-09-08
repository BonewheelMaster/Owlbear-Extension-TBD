"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRangedAI = exports.initMeleeAI = exports.RANGED = exports.MELEE = void 0;
exports.validMetadata = validMetadata;
exports.MELEE = "MELEE";
exports.RANGED = "RANGED";
exports.initMeleeAI = {
    kind: exports.MELEE,
    enabled: true,
    speed: 30,
    target: "",
};
exports.initRangedAI = {
    kind: exports.RANGED,
    enabled: true,
    speed: 30,
    target: "",
    range: 60,
};
// Determine if the given object conforms to the NPCAI interface.
function validMetadata(meta) {
    if (typeof meta == "object"
        && "kind" in meta) {
        switch (meta.kind) {
            case exports.MELEE:
                return ("enabled" in meta
                    && typeof meta.enabled == "boolean"
                    && "speed" in meta
                    && typeof meta.speed == "number"
                    && "target" in meta
                    && typeof meta.target == "string");
            case exports.RANGED:
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
