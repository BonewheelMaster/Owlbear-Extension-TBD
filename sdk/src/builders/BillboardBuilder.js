import { GenericItemBuilder } from "./GenericItemBuilder";
export class BillboardBuilder extends GenericItemBuilder {
    _image;
    _grid;
    _style;
    constructor(player, image, grid) {
        super(player);
        this._image = image;
        this._grid = grid;
        this._item.name = "Billboard";
        this._style = {};
    }
    maxViewScale(maxViewScale) {
        this._style.maxViewScale = maxViewScale;
        return this.self();
    }
    minViewScale(minViewScale) {
        this._style.minViewScale = minViewScale;
        return this.self();
    }
    build() {
        return {
            ...this._item,
            type: "BILLBOARD",
            image: this._image,
            grid: this._grid,
            style: this._style,
        };
    }
}
