class PlayerApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    get id() {
        // Get the user id from the message bus which will be populated once OBR_READY is handled
        if (!this.messageBus.userId) {
            throw Error("Unable to get user ID: not ready");
        }
        return this.messageBus.userId;
    }
    async getSelection() {
        const { selection } = await this.messageBus.sendAsync("OBR_PLAYER_GET_SELECTION", {});
        return selection;
    }
    async select(items, replace) {
        await this.messageBus.sendAsync("OBR_PLAYER_SELECT", { items, replace });
    }
    async deselect(items) {
        await this.messageBus.sendAsync("OBR_PLAYER_DESELECT", { items });
    }
    async getName() {
        const { name } = await this.messageBus.sendAsync("OBR_PLAYER_GET_NAME", {});
        return name;
    }
    async setName(name) {
        await this.messageBus.sendAsync("OBR_PLAYER_SET_NAME", { name });
    }
    async getColor() {
        const { color } = await this.messageBus.sendAsync("OBR_PLAYER_GET_COLOR", {});
        return color;
    }
    async setColor(color) {
        await this.messageBus.sendAsync("OBR_PLAYER_SET_COLOR", { color });
    }
    async getSyncView() {
        const { syncView } = await this.messageBus.sendAsync("OBR_PLAYER_GET_SYNC_VIEW", {});
        return syncView;
    }
    async setSyncView(syncView) {
        await this.messageBus.sendAsync("OBR_PLAYER_SET_SYNC_VIEW", { syncView });
    }
    async getId() {
        const { id } = await this.messageBus.sendAsync("OBR_PLAYER_GET_ID", {});
        return id;
    }
    async getRole() {
        const { role } = await this.messageBus.sendAsync("OBR_PLAYER_GET_ROLE", {});
        return role;
    }
    async getMetadata() {
        const { metadata } = await this.messageBus.sendAsync("OBR_PLAYER_GET_METADATA", {});
        return metadata;
    }
    async setMetadata(update) {
        await this.messageBus.sendAsync("OBR_PLAYER_SET_METADATA", { update });
    }
    async hasPermission(permission) {
        const role = await this.getRole();
        if (role === "GM") {
            return true;
        }
        const { permissions } = await this.messageBus.sendAsync("OBR_ROOM_GET_PERMISSIONS", {});
        return permissions.indexOf(permission) > -1;
    }
    async getConnectionId() {
        const { connectionId } = await this.messageBus.sendAsync("OBR_PLAYER_GET_CONNECTION_ID", {});
        return connectionId;
    }
    onChange(callback) {
        const handleChange = (data) => {
            callback(data.player);
        };
        this.messageBus.send("OBR_PLAYER_SUBSCRIBE", {});
        this.messageBus.on("OBR_PLAYER_EVENT_CHANGE", handleChange);
        return () => {
            this.messageBus.send("OBR_PLAYER_UNSUBSCRIBE", {});
            this.messageBus.off("OBR_PLAYER_EVENT_CHANGE", handleChange);
        };
    }
}
export default PlayerApi;
