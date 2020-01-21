import Action from '../interfaces/action';

const Types = {
    MODULE_MESSAGE: 'ModuleMessage',
};

const sendModuleMessage = (moduleId: string, command: string, content: any): Action => ({
    type: Types.MODULE_MESSAGE,
    payload: {
        recipient: `PLAYER_SHIP/${moduleId}`,
        command: command,
        content: content
    },
    meta: {
        socket: true
    }
});

export default {
    Types,
    sendModuleMessage
};
