import { normalizeUrlObject } from "../common/normalize";
class ModalApi {
    messageBus;
    constructor(messageBus) {
        this.messageBus = messageBus;
    }
    async open(modal) {
        await this.messageBus.sendAsync("OBR_MODAL_OPEN", {
            ...normalizeUrlObject(modal),
        });
    }
    async close(id) {
        await this.messageBus.sendAsync("OBR_MODAL_CLOSE", { id });
    }
}
export default ModalApi;
