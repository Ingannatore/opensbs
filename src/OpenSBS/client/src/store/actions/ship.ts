import SocketAction from '../interfaces/socket-action';

const Types = {
    SEND_MODULE_MESSAGE: 'SEND_MODULE_MESSAGE',
};

const sendModuleMessage = (moduleId: string, command: string, payload: any): SocketAction => ({
    type: Types.SEND_MODULE_MESSAGE,
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
    sendModuleMessage
};
