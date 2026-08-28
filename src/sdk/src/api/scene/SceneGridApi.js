class SceneGridApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    async getDpi() {
        const { dpi } = await this.messageBus.sendAsync("OBR_SCENE_GRID_GET_DPI", {});
        return dpi;
    }
    async getScale() {
        const scale = await this.messageBus.sendAsync("OBR_SCENE_GRID_GET_SCALE", {});
        return scale;
    }
    async setScale(scale) {
        await this.messageBus.sendAsync("OBR_SCENE_GRID_SET_SCALE", { scale });
    }
    async getColor() {
        const { color } = await this.messageBus.sendAsync("OBR_SCENE_GRID_GET_COLOR", {});
        return color;
    }
    async setColor(color) {
        await this.messageBus.sendAsync("OBR_SCENE_GRID_SET_COLOR", { color });
    }
    async getOpacity() {
        const { opacity } = await this.messageBus.sendAsync("OBR_SCENE_GRID_GET_OPACITY", {});
        return opacity;
    }
    async setOpacity(opacity) {
        await this.messageBus.sendAsync("OBR_SCENE_GRID_SET_OPACITY", { opacity });
    }
    async getType() {
        const { type } = await this.messageBus.sendAsync("OBR_SCENE_GRID_GET_TYPE", {});
        return type;
    }
    async setType(type) {
        await this.messageBus.sendAsync("OBR_SCENE_GRID_SET_TYPE", { type });
    }
    async getLineType() {
        const { lineType } = await this.messageBus.sendAsync("OBR_SCENE_GRID_GET_LINE_TYPE", {});
        return lineType;
    }
    async setLineType(lineType) {
        await this.messageBus.sendAsync("OBR_SCENE_GRID_SET_LINE_TYPE", {
            lineType,
        });
    }
    async getMeasurement() {
        const { measurement } = await this.messageBus.sendAsync("OBR_SCENE_GRID_GET_MEASUREMENT", {});
        return measurement;
    }
    async setMeasurement(measurement) {
        await this.messageBus.sendAsync("OBR_SCENE_GRID_SET_MEASUREMENT", {
            measurement,
        });
    }
    async getLineWidth() {
        const { lineWidth } = await this.messageBus.sendAsync("OBR_SCENE_GRID_GET_LINE_WIDTH", {});
        return lineWidth;
    }
    async setLineWidth(lineWidth) {
        await this.messageBus.sendAsync("OBR_SCENE_GRID_SET_LINE_WIDTH", {
            lineWidth,
        });
    }
    async snapPosition(position, snappingSensitivity, useCorners, useCenter) {
        const { position: snapped } = await this.messageBus.sendAsync("OBR_SCENE_GRID_SNAP_POSITION", {
            position,
            snappingSensitivity,
            useCorners,
            useCenter,
        });
        return snapped;
    }
    async getDistance(from, to) {
        const { distance } = await this.messageBus.sendAsync("OBR_SCENE_GRID_GET_DISTANCE", { from, to });
        return distance;
    }
    onChange(callback) {
        const handleChange = (data) => {
            callback(data.grid);
        };
        this.messageBus.send("OBR_SCENE_GRID_SUBSCRIBE", {});
        this.messageBus.on("OBR_SCENE_GRID_EVENT_CHANGE", handleChange);
        return () => {
            this.messageBus.send("OBR_SCENE_GRID_UNSUBSCRIBE", {});
            this.messageBus.off("OBR_SCENE_GRID_EVENT_CHANGE", handleChange);
        };
    }
}
export default SceneGridApi;
