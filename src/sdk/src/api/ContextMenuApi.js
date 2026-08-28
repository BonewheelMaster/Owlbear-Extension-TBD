import { normalizeIconPaths, normalizeUrlObject } from "../common/normalize";
class ContextMenuApi {
    messageBus;
    contextMenus = {};
    constructor(messageBus) {
        this.messageBus = messageBus;
        messageBus.on("OBR_CONTEXT_MENU_EVENT_CLICK", this.handleClick);
    }
    handleClick = (event) => {
        const menu = this.contextMenus[event.id];
        if (menu) {
            menu.onClick?.(event.context, event.elementId);
        }
    };
    async create(contextMenu) {
        this.messageBus.sendAsync("OBR_CONTEXT_MENU_CREATE", {
            id: contextMenu.id,
            shortcut: contextMenu.shortcut,
            icons: normalizeIconPaths(contextMenu.icons),
            embed: contextMenu.embed && normalizeUrlObject(contextMenu.embed),
        });
        this.contextMenus[contextMenu.id] = contextMenu;
    }
    async remove(id) {
        await this.messageBus.sendAsync("OBR_CONTEXT_MENU_REMOVE", { id });
        delete this.contextMenus[id];
    }
}
export default ContextMenuApi;
