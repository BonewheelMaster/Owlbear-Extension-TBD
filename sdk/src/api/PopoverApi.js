import { normalizeUrlObject } from "../common/normalize";
class PopoverApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    async open(popover) {
        await this.messageBus.sendAsync("OBR_POPOVER_OPEN", {
            ...normalizeUrlObject(popover),
        });
    }
    async close(id) {
        await this.messageBus.sendAsync("OBR_POPOVER_CLOSE", { id });
    }
    async getWidth(id) {
        const { width } = await this.messageBus.sendAsync("OBR_POPOVER_GET_WIDTH", { id });
        return width;
    }
    async setWidth(id, width) {
        await this.messageBus.sendAsync("OBR_POPOVER_SET_WIDTH", { id, width });
    }
    async getHeight(id) {
        const { height } = await this.messageBus.sendAsync("OBR_POPOVER_GET_HEIGHT", { id });
        return height;
    }
    async setHeight(id, height) {
        await this.messageBus.sendAsync("OBR_POPOVER_SET_HEIGHT", { id, height });
    }
}
export default PopoverApi;
