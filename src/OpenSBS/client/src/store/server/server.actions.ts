import ActionModel from '../action.model';

const Types = {
    START_MISSION: 'server/init',
    PAUSE_MISSION: 'server/pauseMission',
    REFRESH_SERVER_STATE: 'server/refresh'
};

const startMission = (id: string): ActionModel => ({
    type: Types.START_MISSION,
    payload: id,
    meta: {socket: true, entity: null, module: null}
});

const pauseMission = (): ActionModel => ({
    type: Types.PAUSE_MISSION,
    payload: null,
    meta: {socket: true, entity: null, module: null}
});

export default {
    Types,
    startMission,
    pauseMission
};
