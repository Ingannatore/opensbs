import Action from '../action.model';

const Types = {
    START_MISSION: 'server/startMission',
    PAUSE_MISSION: 'server/pauseMission',
    REFRESH_SERVER_STATE: 'server/refresh'
};

const startMission = (id: string): Action => ({
    type: Types.START_MISSION,
    payload: id,
    meta: {socket: true, entity: null, module: null}
});

const pauseMission = (): Action => ({
    type: Types.PAUSE_MISSION,
    payload: null,
    meta: {socket: true, entity: null, module: null}
});

const refreshServerState = (data: any): Action => ({
    type: Types.REFRESH_SERVER_STATE,
    payload: data,
    meta: null
});

export default {
    Types,
    startMission,
    pauseMission,
    refreshServerState
};
