import OBR from "@owlbear-rodeo/sdk";

export const MELEE  = "MELEE";
export const RANGED = "RANGED";

export type NPCAI = MeleeAI | RangedAI;

export type MeleeAI = {
    kind: typeof MELEE;
    enabled: boolean;
    speed: number;
    target: string; // ID of item
};

export type RangedAI = {
    kind: typeof RANGED;
    enabled: boolean;
    speed: number;
    target: string; // ID of item
    range: number;
};

export const initMeleeAI : MeleeAI = {
    kind: MELEE,
    enabled: true,
    speed: 30,
    target: "",
};

export const initRangedAI : RangedAI = {
    kind: RANGED,
    enabled: true,
    speed: 30,
    target: "",
    range: 60,
};

// Determine if the given object conforms to the NPCAI interface.
export function validMetadata(meta : any): meta is NPCAI {
    if ( typeof meta == "object"
      && "kind" in meta
    ) { switch (meta.kind) {
            case MELEE:
                return ( "enabled" in meta
                      && typeof meta.enabled == "boolean"
                      && "speed" in meta
                      && typeof meta.speed == "number"
                      && "target" in meta
                      && typeof meta.target == "string"
                );
            case RANGED:
                return ( "enabled" in meta
                      && typeof meta.enabled == "boolean"
                      && "speed" in meta
                      && typeof meta.speed == "number"
                      && "target" in meta
                      && typeof meta.target == "string"
                      && "range" in meta
                      && typeof meta.range == "number"
                );
            default: return false;
        }
    }
    else { return false; }
}
