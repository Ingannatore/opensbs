import SocketAction from '../interfaces/socket-action';

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
        recipient: 'PLAYER_SHIP',
        command: null
    }
});

const sendModuleMessage = (moduleId: string, command: string, payload: any): SocketAction => ({
    type: Types.UPDATE_STATE,
    payload: payload,
    meta: {
        socket: true,
        method: 'ModuleMessage',
        empty: false,
        recipient: `PLAYER_SHIP/${moduleId}`,
        command: command
    }
});

export default {
    Types,
    updateState,
    sendModuleMessage
};
