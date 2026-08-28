import { normalizeIconPaths } from "../common/normalize";
class ActionApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    async getWidth() {
        const { width } = await this.messageBus.sendAsync("OBR_ACTION_GET_WIDTH", {});
        return width;
    }
    async setWidth(width) {
        await this.messageBus.sendAsync("OBR_ACTION_SET_WIDTH", { width });
    }
    async getHeight() {
        const { height } = await this.messageBus.sendAsync("OBR_ACTION_GET_HEIGHT", {});
        return height;
    }
    async setHeight(height) {
        await this.messageBus.sendAsync("OBR_ACTION_SET_HEIGHT", { height });
    }
    async getBadgeText() {
        const { badgeText } = await this.messageBus.sendAsync("OBR_ACTION_GET_BADGE_TEXT", {});
        return badgeText;
    }
    async setBadgeText(badgeText) {
        await this.messageBus.sendAsync("OBR_ACTION_SET_BADGE_TEXT", { badgeText });
    }
    async getBadgeBackgroundColor() {
        const { badgeBackgroundColor } = await this.messageBus.sendAsync("OBR_ACTION_GET_BADGE_BACKGROUND_COLOR", {});
        return badgeBackgroundColor;
    }
    async setBadgeBackgroundColor(badgeBackgroundColor) {
        await this.messageBus.sendAsync("OBR_ACTION_SET_BADGE_BACKGROUND_COLOR", {
            badgeBackgroundColor,
        });
    }
    async getIcon() {
        const { icon } = await this.messageBus.sendAsync("OBR_ACTION_GET_ICON", {});
        return icon;
    }
    async setIcon(icon) {
        const data = normalizeIconPaths([{ icon }]);
        await this.messageBus.sendAsync("OBR_ACTION_SET_ICON", {
            icon: data[0].icon,
        });
    }
    async getTitle() {
        const { title } = await this.messageBus.sendAsync("OBR_ACTION_GET_TITLE", {});
        return title;
    }
    async setTitle(title) {
        await this.messageBus.sendAsync("OBR_ACTION_SET_TITLE", { title });
    }
    async isOpen() {
        const { isOpen } = await this.messageBus.sendAsync("OBR_ACTION_GET_IS_OPEN", {});
        return isOpen;
    }
    async open() {
        await this.messageBus.sendAsync("OBR_ACTION_OPEN", {});
    }
    async close() {
        await this.messageBus.sendAsync("OBR_ACTION_CLOSE", {});
    }
    onOpenChange(callback) {
        const handleChange = (data) => {
            callback(data.isOpen);
        };
        this.messageBus.send("OBR_ACTION_IS_OPEN_SUBSCRIBE", {});
        this.messageBus.on("OBR_ACTION_IS_OPEN_EVENT_CHANGE", handleChange);
        return () => {
            this.messageBus.send("OBR_IS_OPEN_ACTION_UNSUBSCRIBE", {});
            this.messageBus.off("OBR_ACTION_IS_OPEN_EVENT_CHANGE", handleChange);
        };
    }
}
export default ActionApi;
