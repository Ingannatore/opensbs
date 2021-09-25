import ClientAction from '../clientAction';

const Types = {
    REFRESH: 'spaceship/refresh',
};

const sendModuleAction = (entityId: string, moduleId: string, type: string, payload: any): ClientAction => ({
    type: type,
    payload: payload,
    meta: {socket: true, entity: entityId, module: moduleId}
});

export default {
    Types,
    sendModuleAction,
};
