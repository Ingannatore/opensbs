import ClientAction from '../clientAction';

const sendModuleAction = (entityId: string, moduleId: string, type: string, payload: any): ClientAction => ({
    type: type,
    payload: payload,
    meta: {socket: true, entity: entityId, module: moduleId}
});

const spaceshipActions = {
    sendModuleAction,
};

export default spaceshipActions;
