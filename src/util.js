"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATE = exports.ID = void 0;
exports.allNPCS = allNPCS;
var state = require("./state");
exports.ID = "Owlbear-Extension-TBD/io.github.bonewheelmaster";
exports.STATE = "".concat(exports.ID, "/state");
//export async function allNPCs() : Promise<state.NPC[]> {
//    const items = await OBR.scene.items.getItems()
function allNPCS(items) {
    var npcs = [];
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        if (state.validMetadata(item.metadata)) {
            npcs.push(__assign(__assign({}, item), { meta: item.metadata }));
        }
    }
    return npcs;
}
var c = {
    enabled: true,
    kind: "MELEE",
    speed: 30,
    target: ""
};
console.log(allNPCS([c]));
