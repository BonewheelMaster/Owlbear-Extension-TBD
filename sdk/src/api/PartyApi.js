class PartyApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    async getPlayers() {
        const { players } = await this.messageBus.sendAsync("OBR_PARTY_GET_PLAYERS", {});
        return players;
    }
    onChange(callback) {
        const handleChange = (data) => {
            callback(data.players);
        };
        this.messageBus.send("OBR_PARTY_SUBSCRIBE", {});
        this.messageBus.on("OBR_PARTY_EVENT_CHANGE", handleChange);
        return () => {
            this.messageBus.send("OBR_PARTY_UNSUBSCRIBE", {});
            this.messageBus.off("OBR_PARTY_EVENT_CHANGE", handleChange);
        };
    }
}
export default PartyApi;
