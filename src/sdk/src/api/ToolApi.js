import { normalizeIconPaths } from "../common/normalize";
class ToolApi {
    messageBus;
    tools = {};
    toolActions = {};
    toolModes = {};
    constructor(messageBus) {
        this.messageBus = messageBus;
        messageBus.on("OBR_TOOL_EVENT_CLICK", this.handleToolClick);
        messageBus.on("OBR_TOOL_ACTION_EVENT_CLICK", this.handleToolActionClick);
        messageBus.on("OBR_TOOL_MODE_EVENT_CLICK", this.handleToolModeClick);
        messageBus.on("OBR_TOOL_MODE_EVENT_TOOL_CLICK", this.handleToolModeToolClick);
        messageBus.on("OBR_TOOL_MODE_EVENT_TOOL_DOUBLE_CLICK", this.handleToolModeToolDoubleClick);
        messageBus.on("OBR_TOOL_MODE_EVENT_TOOL_DOWN", this.handleToolModeToolDown);
        messageBus.on("OBR_TOOL_MODE_EVENT_TOOL_MOVE", this.handleToolModeToolMove);
        messageBus.on("OBR_TOOL_MODE_EVENT_TOOL_UP", this.handleToolModeToolUp);
        messageBus.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_START", this.handleToolModeToolDragStart);
        messageBus.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_MOVE", this.handleToolModeToolDragMove);
        messageBus.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_END", this.handleToolModeToolDragEnd);
        messageBus.on("OBR_TOOL_MODE_EVENT_TOOL_DRAG_CANCEL", this.handleToolModeToolDragCancel);
        messageBus.on("OBR_TOOL_MODE_EVENT_KEY_DOWN", this.handleToolModeKeyDown);
        messageBus.on("OBR_TOOL_MODE_EVENT_KEY_UP", this.handleToolModeKeyUp);
        messageBus.on("OBR_TOOL_MODE_EVENT_ACTIVATE", this.handleToolModeActivate);
        messageBus.on("OBR_TOOL_MODE_EVENT_DEACTIVATE", this.handleToolModeDeactivate);
    }
    handleToolClick = (event) => {
        const tool = this.tools[event.id];
        if (tool) {
            if (tool.onClick) {
                const result = tool.onClick(event.context, event.elementId);
                Promise.resolve(result).then((activate) => {
                    if (activate) {
                        this.messageBus.send("OBR_TOOL_ACTIVATE", {
                            id: event.id,
                        });
                    }
                });
            }
            else {
                this.messageBus.send("OBR_TOOL_ACTIVATE", {
                    id: event.id,
                });
            }
        }
    };
    handleToolActionClick = (event) => {
        const action = this.toolActions[event.id];
        if (action) {
            action.onClick?.(event.context, event.elementId);
        }
    };
    handleToolModeClick = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
            if (mode.onClick) {
                const result = mode.onClick(event.context, event.elementId);
                Promise.resolve(result).then((activate) => {
                    if (activate) {
                        this.messageBus.send("OBR_TOOL_MODE_ACTIVATE", {
                            toolId: event.context.activeTool,
                            modeId: event.id,
                        });
                    }
                });
            }
            else {
                this.messageBus.send("OBR_TOOL_MODE_ACTIVATE", {
                    toolId: event.context.activeTool,
                    modeId: event.id,
                });
            }
        }
    };
    handleToolModeToolClick = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
            if (mode.onToolClick) {
                const result = mode.onToolClick(event.context, event.event);
                Promise.resolve(result).then((select) => {
                    if (select && event.event.target && !event.event.target.locked) {
                        this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
                            items: [event.event.target.id],
                        });
                    }
                });
            }
            else {
                if (event.event.target && !event.event.target.locked) {
                    this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
                        items: [event.event.target.id],
                    });
                }
            }
        }
    };
    handleToolModeToolDoubleClick = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
            if (mode.onToolDoubleClick) {
                const result = mode.onToolDoubleClick(event.context, event.event);
                Promise.resolve(result).then((select) => {
                    if (select && event.event.target) {
                        this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
                            items: [event.event.target.id],
                        });
                    }
                });
            }
            else {
                if (event.event.target) {
                    this.messageBus.sendAsync("OBR_PLAYER_SELECT", {
                        items: [event.event.target.id],
                    });
                }
            }
        }
    };
    handleToolModeToolDown = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
            mode.onToolDown?.(event.context, event.event);
        }
    };
    handleToolModeToolMove = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
            mode.onToolMove?.(event.context, event.event);
        }
    };
    handleToolModeToolUp = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
            mode.onToolUp?.(event.context, event.event);
        }
    };
    handleToolModeToolDragStart = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
            mode.onToolDragStart?.(event.context, event.event);
        }
    };
    handleToolModeToolDragMove = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
            mode.onToolDragMove?.(event.context, event.event);
        }
    };
    handleToolModeToolDragEnd = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
            mode.onToolDragEnd?.(event.context, event.event);
        }
    };
    handleToolModeToolDragCancel = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
            mode.onToolDragCancel?.(event.context, event.event);
        }
    };
    handleToolModeKeyDown = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
            mode.onKeyDown?.(event.context, event.event);
        }
    };
    handleToolModeKeyUp = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
            mode.onKeyUp?.(event.context, event.event);
        }
    };
    handleToolModeActivate = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
            mode.onActivate?.(event.context);
        }
    };
    handleToolModeDeactivate = (event) => {
        const mode = this.toolModes[event.id];
        if (mode) {
            mode.onDeactivate?.(event.context);
        }
    };
    async create(tool) {
        await this.messageBus.sendAsync("OBR_TOOL_CREATE", {
            id: tool.id,
            shortcut: tool.shortcut,
            defaultMode: tool.defaultMode,
            defaultMetadata: tool.defaultMetadata,
            icons: normalizeIconPaths(tool.icons),
            disabled: tool.disabled,
        });
        this.tools[tool.id] = tool;
    }
    async remove(id) {
        await this.messageBus.sendAsync("OBR_TOOL_REMOVE", { id });
        delete this.tools[id];
    }
    async activateTool(id) {
        await this.messageBus.sendAsync("OBR_TOOL_ACTIVATE", { id });
    }
    async getActiveTool() {
        const { id } = await this.messageBus.sendAsync("OBR_TOOL_GET_ACTIVE", {});
        return id;
    }
    onToolChange(callback) {
        const handleChange = (data) => {
            callback(data.id);
        };
        this.messageBus.send("OBR_TOOL_ACTIVE_SUBSCRIBE", {});
        this.messageBus.on("OBR_TOOL_ACTIVE_EVENT_CHANGE", handleChange);
        return () => {
            this.messageBus.send("OBR_TOOL_ACTIVE_UNSUBSCRIBE", {});
            this.messageBus.off("OBR_TOOL_ACTIVE_EVENT_CHANGE", handleChange);
        };
    }
    async getMetadata(id) {
        const { metadata } = await this.messageBus.sendAsync("OBR_TOOL_GET_METADATA", { id });
        return metadata;
    }
    async setMetadata(toolId, update) {
        await this.messageBus.sendAsync("OBR_TOOL_SET_METADATA", {
            toolId,
            update,
        });
    }
    async createAction(action) {
        await this.messageBus.sendAsync("OBR_TOOL_ACTION_CREATE", {
            id: action.id,
            shortcut: action.shortcut,
            icons: normalizeIconPaths(action.icons),
            disabled: action.disabled,
        });
        this.toolActions[action.id] = action;
    }
    async removeAction(id) {
        await this.messageBus.sendAsync("OBR_TOOL_ACTION_REMOVE", { id });
        delete this.tools[id];
    }
    async createMode(mode) {
        await this.messageBus.sendAsync("OBR_TOOL_MODE_CREATE", {
            id: mode.id,
            shortcut: mode.shortcut,
            icons: normalizeIconPaths(mode.icons),
            preventDrag: mode.preventDrag,
            disabled: mode.disabled,
            cursors: mode.cursors,
        });
        this.toolModes[mode.id] = mode;
    }
    async removeMode(id) {
        await this.messageBus.sendAsync("OBR_TOOL_MODE_REMOVE", { id });
        delete this.tools[id];
    }
    async activateMode(toolId, modeId) {
        await this.messageBus.sendAsync("OBR_TOOL_MODE_ACTIVATE", {
            toolId,
            modeId,
        });
    }
    async getActiveToolMode() {
        const { id } = await this.messageBus.sendAsync("OBR_TOOL_MODE_GET_ACTIVE", {});
        return id;
    }
    onToolModeChange(callback) {
        const handleChange = (data) => {
            callback(data.id);
        };
        this.messageBus.send("OBR_TOOL_MODE_ACTIVE_SUBSCRIBE", {});
        this.messageBus.on("OBR_TOOL_MODE_ACTIVE_EVENT_CHANGE", handleChange);
        return () => {
            this.messageBus.send("OBR_TOOL_MODE_ACTIVE_UNSUBSCRIBE", {});
            this.messageBus.off("OBR_TOOL_MODE_ACTIVE_EVENT_CHANGE", handleChange);
        };
    }
}
export default ToolApi;
