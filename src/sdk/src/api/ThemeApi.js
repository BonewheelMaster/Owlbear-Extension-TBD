class ThemeApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    async getTheme() {
        const { theme } = await this.messageBus.sendAsync("OBR_THEME_GET_THEME", {});
        return theme;
    }
    onChange(callback) {
        const handleChange = (data) => {
            callback(data.theme);
        };
        this.messageBus.send("OBR_THEME_SUBSCRIBE", {});
        this.messageBus.on("OBR_THEME_EVENT_CHANGE", handleChange);
        return () => {
            this.messageBus.send("OBR_THEME_UNSUBSCRIBE", {});
            this.messageBus.off("OBR_THEME_EVENT_CHANGE", handleChange);
        };
    }
}
export default ThemeApi;
