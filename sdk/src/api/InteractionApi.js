import { enablePatches, produceWithPatches } from "immer";
enablePatches();
class InteractionApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    async startItemInteraction(baseState) {
        const { id } = await this.messageBus.sendAsync("OBR_INTERACTION_START_ITEM_INTERACTION", { baseState });
        let prev = baseState;
        const dispatcher = (update) => {
            const [next, patches] = produceWithPatches(prev, update);
            prev = next;
            this.messageBus.send("OBR_INTERACTION_UPDATE_ITEM_INTERACTION", {
                id,
                patches,
            });
            return next;
        };
        const stop = () => {
            this.messageBus.send("OBR_INTERACTION_STOP_ITEM_INTERACTION", { id });
        };
        return [dispatcher, stop];
    }
}
export default InteractionApi;
