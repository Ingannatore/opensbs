import Action from '../models/action';

const sendModuleAction = (entityId: string, moduleId: string, type: string, payload: any): Action => ({
    type: type,
    payload: payload,
    meta: {socket: true, entity: entityId, module: moduleId}
});

export default {
    sendModuleAction
};
