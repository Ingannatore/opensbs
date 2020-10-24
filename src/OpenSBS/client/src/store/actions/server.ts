import Action from '../models/action';

const Types = {
    GET_MISSIONS: 'server/getMissions',
    SET_MISSIONS: 'server/setMissions',
    START_MISSION: 'server/startMission',
    PAUSE_MISSION: 'server/pauseMission',
    REFRESH_SERVER_STATE: 'server/refreshState'
};

const getMissions = (): Action => ({
    type: Types.GET_MISSIONS,
    payload: null,
    meta: {socket: true, entity: null, module: null}
});

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

const refreshServerState = (data: string): Action => ({
    type: Types.REFRESH_SERVER_STATE,
    payload: JSON.parse(data),
    meta: null
});

export default {
    Types,
    startMission,
    pauseMission,
    getMissions,
    refreshServerState
};
