import OBR from "@owlbear-rodeo/sdk";

export const MELEE  = "MELEE";
export const RANGED = "RANGED";

export type MeleeAI = {
    kind: typeof MELEE;
    speed: number;
    target: string; // ID of item
};

export type RangedAI = {
    kind: typeof RANGED;
    speed: number;
    target: string; // ID of item
    range: number;
};

export const initMeleeAI : MeleeAI = {
    kind: MELEE,
    speed: 30,
    target: "",
};

export const initRangedAI : RangedAI = {
    kind: RANGED,
    speed: 30,
    target: "",
    range: 60,
};
