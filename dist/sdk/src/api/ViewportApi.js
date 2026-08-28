class ViewportApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    async reset() {
        const { transform } = await this.messageBus.sendAsync("OBR_VIEWPORT_RESET", {});
        return transform;
    }
    async animateTo(transform) {
        await this.messageBus.sendAsync("OBR_VIEWPORT_ANIMATE_TO", { transform });
    }
    async animateToBounds(bounds) {
        await this.messageBus.sendAsync("OBR_VIEWPORT_ANIMATE_TO_BOUNDS", {
            bounds,
        });
    }
    async getPosition() {
        const { position } = await this.messageBus.sendAsync("OBR_VIEWPORT_GET_POSITION", {});
        return position;
    }
    async setPosition(position) {
        await this.messageBus.sendAsync("OBR_VIEWPORT_SET_POSITION", { position });
    }
    async getScale() {
        const { scale } = await this.messageBus.sendAsync("OBR_VIEWPORT_GET_SCALE", {});
        return scale;
    }
    async setScale(scale) {
        await this.messageBus.sendAsync("OBR_VIEWPORT_SET_SCALE", { scale });
    }
    async getWidth() {
        const { width } = await this.messageBus.sendAsync("OBR_VIEWPORT_GET_WIDTH", {});
        return width;
    }
    async getHeight() {
        const { height } = await this.messageBus.sendAsync("OBR_VIEWPORT_GET_HEIGHT", {});
        return height;
    }
    async transformPoint(point) {
        const { point: transformed } = await this.messageBus.sendAsync("OBR_VIEWPORT_TRANSFORM_POINT", { point });
        return transformed;
    }
    async inverseTransformPoint(point) {
        const { point: transformed } = await this.messageBus.sendAsync("OBR_VIEWPORT_INVERSE_TRANSFORM_POINT", { point });
        return transformed;
    }
}
export default ViewportApi;
