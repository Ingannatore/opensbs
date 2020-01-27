import Action from '../models/action';

const Types = {
    MODULE_MESSAGE: 'ModuleMessage',
};

const sendModuleMessage = (entityId: string, moduleId: string, command: string, content: any): Action => ({
    type: Types.MODULE_MESSAGE,
    payload: {
        recipient: `${entityId}/${moduleId}`,
        command: command,
        content: content
    },
    meta: {socket: true}
});

export default {
    Types,
    sendModuleMessage
};
