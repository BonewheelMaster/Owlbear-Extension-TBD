import { enablePatches, produceWithPatches } from "immer";
enablePatches();
class SceneLocalApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    async getItems(filter) {
        if (Array.isArray(filter)) {
            const { items } = await this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEMS", { ids: filter });
            return items;
        }
        else if (filter) {
            const { items } = await this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ALL_ITEMS", {});
            return items.filter(filter);
        }
        else {
            const { items } = await this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ALL_ITEMS", {});
            return items;
        }
    }
    isItemArray(value) {
        return (Array.isArray(value) && value.every((item) => typeof item !== "string"));
    }
    async updateItems(filterOrItems, update, fastUpdate) {
        let items;
        if (this.isItemArray(filterOrItems)) {
            items = filterOrItems;
        }
        else {
            items = await this.getItems(filterOrItems);
        }
        const [nextState, patches] = produceWithPatches(items, update);
        const nextUpdates = nextState.map((item) => ({
            id: item.id,
            type: item.type,
        }));
        // Use patches to get the partial update keys
        for (const patch of patches) {
            const [index, key] = patch.path;
            if (typeof index === "number" && typeof key === "string") {
                nextUpdates[index][key] = nextState[index][key];
            }
        }
        // Filter out any update without changes
        const updates = nextUpdates.filter(
        // Ensure that there are updates besides the default ID and type
        (update) => Object.keys(update).length > 2);
        if (updates.length === 0) {
            return;
        }
        await this.messageBus.sendAsync("OBR_SCENE_LOCAL_UPDATE_ITEMS", {
            updates,
            fastUpdate,
        });
    }
    async addItems(items) {
        await this.messageBus.sendAsync("OBR_SCENE_LOCAL_ADD_ITEMS", {
            items,
        });
    }
    async deleteItems(ids) {
        await this.messageBus.sendAsync("OBR_SCENE_LOCAL_DELETE_ITEMS", {
            ids,
        });
    }
    async getItemAttachments(ids) {
        const { items } = await this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEM_ATTACHMENTS", { ids });
        return items;
    }
    async getItemBounds(ids) {
        const { bounds } = await this.messageBus.sendAsync("OBR_SCENE_LOCAL_GET_ITEM_BOUNDS", { ids });
        return bounds;
    }
    onChange(callback) {
        const handleChange = (data) => {
            callback(data.items);
        };
        this.messageBus.send("OBR_SCENE_LOCAL_SUBSCRIBE", {});
        this.messageBus.on("OBR_SCENE_LOCAL_EVENT_CHANGE", handleChange);
        return () => {
            this.messageBus.send("OBR_SCENE_LOCAL_UNSUBSCRIBE", {});
            this.messageBus.off("OBR_SCENE_LOCAL_EVENT_CHANGE", handleChange);
        };
    }
}
export default SceneLocalApi;
