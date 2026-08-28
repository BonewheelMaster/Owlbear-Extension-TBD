class BroadcastApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    async sendMessage(channel, data, options) {
        await this.messageBus.sendAsync("OBR_BROADCAST_SEND_MESSAGE", {
            channel,
            data,
            options,
        });
    }
    onMessage(channel, callback) {
        this.messageBus.send("OBR_BROADCAST_SUBSCRIBE", { channel });
        this.messageBus.on(`OBR_BROADCAST_MESSAGE_${channel}`, callback);
        return () => {
            this.messageBus.send("OBR_BROADCAST_UNSUBSCRIBE", { channel });
            this.messageBus.off(`OBR_BROADCAST_MESSAGE_${channel}`, callback);
        };
    }
}
export default BroadcastApi;
