import SceneFogApi from "./SceneFogApi";
import SceneGridApi from "./SceneGridApi";
import SceneHistoryApi from "./SceneHistoryApi";
import SceneItemsApi from "./SceneItemsApi";
import SceneLocalApi from "./SceneLocalApi";
class SceneApi {
    messageBus;
    grid;
    fog;
    history;
    items;
    local;
    constructor(messageBus) {
        this.messageBus = messageBus;
        this.grid = new SceneGridApi(messageBus);
        this.fog = new SceneFogApi(messageBus);
        this.history = new SceneHistoryApi(messageBus);
        this.items = new SceneItemsApi(messageBus);
        this.local = new SceneLocalApi(messageBus);
    }
    async isReady() {
        const { ready } = await this.messageBus.sendAsync("OBR_SCENE_IS_READY", {});
        return ready;
    }
    onReadyChange(callback) {
        const handleChange = (data) => {
            callback(data.ready);
        };
        this.messageBus.send("OBR_SCENE_READY_SUBSCRIBE", {});
        this.messageBus.on("OBR_SCENE_EVENT_READY_CHANGE", handleChange);
        return () => {
            this.messageBus.send("OBR_SCENE_READY_UNSUBSCRIBE", {});
            this.messageBus.off("OBR_SCENE_EVENT_READY_CHANGE", handleChange);
        };
    }
    async getMetadata() {
        const { metadata } = await this.messageBus.sendAsync("OBR_SCENE_GET_METADATA", {});
        return metadata;
    }
    async setMetadata(update) {
        await this.messageBus.sendAsync("OBR_SCENE_SET_METADATA", { update });
    }
    onMetadataChange(callback) {
        const handleChange = (data) => {
            callback(data.metadata);
        };
        this.messageBus.send("OBR_SCENE_METADATA_SUBSCRIBE", {});
        this.messageBus.on("OBR_SCENE_METADATA_EVENT_CHANGE", handleChange);
        return () => {
            this.messageBus.send("OBR_SCENE_METADATA_UNSUBSCRIBE", {});
            this.messageBus.off("OBR_SCENE_METADATA_EVENT_CHANGE", handleChange);
        };
    }
}
export default SceneApi;
