import OBR from "@owlbear-rodeo/sdk";

export const MELEE  = "MELEE";
export const RANGED = "RANGED";

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
