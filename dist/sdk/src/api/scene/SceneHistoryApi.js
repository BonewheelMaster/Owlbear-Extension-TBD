class SceneHistoryApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    async undo() {
        await this.messageBus.sendAsync("OBR_SCENE_HISTORY_UNDO", {});
    }
    async redo() {
        await this.messageBus.sendAsync("OBR_SCENE_HISTORY_REDO", {});
    }
    async canUndo() {
        const { canUndo } = await this.messageBus.sendAsync("OBR_SCENE_HISTORY_CAN_UNDO", {});
        return canUndo;
    }
    async canRedo() {
        const { canRedo } = await this.messageBus.sendAsync("OBR_SCENE_HISTORY_CAN_REDO", {});
        return canRedo;
    }
}
export default SceneHistoryApi;
