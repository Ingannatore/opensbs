import Action from '../models/action';

const Types = {
    GET_MISSIONS: 'GetMissions',
    SET_MISSIONS: 'SetMissions',
    START_MISSION: 'StartMission',
    PAUSE_MISSION: 'PauseMission',
    REFRESH_SERVER_STATE: 'RefreshServerState'
};

const getMissions = (): Action => ({
    type: Types.GET_MISSIONS,
    meta: {socket: true}
});

const startMission = (id: string): Action => ({
    type: Types.START_MISSION,
    payload: {content: id},
    meta: {socket: true}
});

const pauseMission = (): Action => ({
    type: Types.PAUSE_MISSION,
    meta: {socket: true}
});

const refreshServerState = (data: string): Action => ({
    type: Types.REFRESH_SERVER_STATE,
    payload: JSON.parse(data)
});

export default {
    Types,
    startMission,
    pauseMission,
    getMissions,
    refreshServerState
};
