class RoomApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    get id() {
        return this.messageBus.roomId;
    }
    async getPermissions() {
        const { permissions } = await this.messageBus.sendAsync("OBR_ROOM_GET_PERMISSIONS", {});
        return permissions;
    }
    async getMetadata() {
        const { metadata } = await this.messageBus.sendAsync("OBR_ROOM_GET_METADATA", {});
        return metadata;
    }
    async setMetadata(update) {
        await this.messageBus.sendAsync("OBR_ROOM_SET_METADATA", { update });
    }
    onMetadataChange(callback) {
        const handleChange = (data) => {
            callback(data.metadata);
        };
        this.messageBus.send("OBR_ROOM_METADATA_SUBSCRIBE", {});
        this.messageBus.on("OBR_ROOM_METADATA_EVENT_CHANGE", handleChange);
        return () => {
            this.messageBus.send("OBR_METADATA_ROOM_UNSUBSCRIBE", {});
            this.messageBus.off("OBR_ROOM_METADATA_EVENT_CHANGE", handleChange);
        };
    }
    onPermissionsChange(callback) {
        const handleChange = (data) => {
            callback(data.permissions);
        };
        this.messageBus.send("OBR_ROOM_PERMISSIONS_SUBSCRIBE", {});
        this.messageBus.on("OBR_ROOM_PERMISSIONS_EVENT_CHANGE", handleChange);
        return () => {
            this.messageBus.send("OBR_PERMISSIONS_ROOM_UNSUBSCRIBE", {});
            this.messageBus.off("OBR_ROOM_PERMISSIONS_EVENT_CHANGE", handleChange);
        };
    }
}
export default RoomApi;
