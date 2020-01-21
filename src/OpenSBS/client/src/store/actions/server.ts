import Action from '../interfaces/action';

const Types = {
    GET_MISSIONS: 'GetMissions',
    GET_MISSIONS_RESPONSE: 'GetMissionsResponse',
    START_MISSION: 'StartMission',
    PAUSE_MISSION: 'PauseMission',
    REFRESH_SERVER_STATE: 'RefreshServerState'
};

const getMissions = (): Action => ({
    type: Types.GET_MISSIONS,
    meta: {
        socket: true
    }
});

const startMission = (id: string): Action => ({
    type: Types.START_MISSION,
    payload: {
        content: id
    },
    meta: {
        socket: true
    }
});

const pauseMission = (): Action => ({
    type: Types.PAUSE_MISSION,
    meta: {
        socket: true
    }
});

export default {
    Types,
    startMission,
    pauseMission,
    getMissions
};
