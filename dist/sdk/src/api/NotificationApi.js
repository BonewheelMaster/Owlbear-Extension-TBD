class NotificationApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    async show(message, variant) {
        const { id } = await this.messageBus.sendAsync("OBR_NOTIFICATION_SHOW", { message, variant });
        return id;
    }
    async close(id) {
        await this.messageBus.sendAsync("OBR_NOTIFICATION_CLOSE", { id });
    }
}
export default NotificationApi;
