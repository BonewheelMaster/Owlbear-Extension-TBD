class SceneFogApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    async getColor() {
        const { color } = await this.messageBus.sendAsync("OBR_SCENE_FOG_GET_COLOR", {});
        return color;
    }
    async setColor(color) {
        await this.messageBus.sendAsync("OBR_SCENE_FOG_SET_COLOR", { color });
    }
    async getStrokeWidth() {
        const { strokeWidth } = await this.messageBus.sendAsync("OBR_SCENE_FOG_GET_STROKE_WIDTH", {});
        return strokeWidth;
    }
    async setStrokeWidth(strokeWidth) {
        await this.messageBus.sendAsync("OBR_SCENE_FOG_SET_STROKE_WIDTH", {
            strokeWidth,
        });
    }
    async getFilled() {
        const { filled } = await this.messageBus.sendAsync("OBR_SCENE_FOG_GET_FILLED", {});
        return filled;
    }
    async setFilled(filled) {
        await this.messageBus.sendAsync("OBR_SCENE_FOG_SET_FILLED", { filled });
    }
    onChange(callback) {
        const handleChange = (data) => {
            callback(data.fog);
        };
        this.messageBus.send("OBR_SCENE_FOG_SUBSCRIBE", {});
        this.messageBus.on("OBR_SCENE_FOG_EVENT_CHANGE", handleChange);
        return () => {
            this.messageBus.send("OBR_SCENE_FOG_UNSUBSCRIBE", {});
            this.messageBus.off("OBR_SCENE_FOG_EVENT_CHANGE", handleChange);
        };
    }
}
export default SceneFogApi;
