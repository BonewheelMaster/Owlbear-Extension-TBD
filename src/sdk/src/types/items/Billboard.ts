import { ImageContent } from "./ImageContent.js";
import { ImageGrid } from "./ImageGrid.js";
import { Item } from "./Item.js";

export interface BillboardStyle {
  maxViewScale?: number;
  minViewScale?: number;
}

export interface Billboard extends Item {
  image: ImageContent;
  grid: ImageGrid;
  style: BillboardStyle;
  type: "BILLBOARD";
}

export function isBillboard(item: Item): item is Billboard {
  return item.type === "BILLBOARD";
}
