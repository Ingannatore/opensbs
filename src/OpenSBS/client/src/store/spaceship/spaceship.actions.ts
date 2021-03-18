import ActionModel from '../action.model';

const Types = {
    REFRESH: 'spaceship/refresh',
};

const sendModuleAction = (entityId: string, moduleId: string, type: string, payload: any): ActionModel => ({
    type: type,
    payload: payload,
    meta: {socket: true, entity: entityId, module: moduleId}
});

export default {
    Types,
    sendModuleAction,
};
