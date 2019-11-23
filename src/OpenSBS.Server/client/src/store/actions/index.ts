import SocketAction from "../models/socket-action";

const Types = {
    UPDATE_STATE: 'UPDATE_STATE',
    REFRESH_STATE: 'REFRESH_STATE',
};

const updateState = (key: string, value: any): SocketAction => ({
    type: Types.UPDATE_STATE,
    payload: {
        key: key,
        value: value
    },
    meta: {
        socket: true,
        method: 'UpdateState',
        empty: false,
        path: 'PLAYER_SHIP',
        module: null
    }
});

const sendModuleMessage = (moduleId: string, payload: any): SocketAction => ({
    type: Types.UPDATE_STATE,
    payload: payload,
    meta: {
        socket: true,
        method: 'ModuleMessage',
        empty: false,
        path: 'PLAYER_SHIP',
        module: moduleId
    }
});

export default {
    Types,
    updateState,
    sendModuleMessage
};
