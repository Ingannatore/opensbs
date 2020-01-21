import SocketAction from '../interfaces/socket-action';

const Types = {
    GET_MISSIONS: 'GET_MISSIONS',
    GET_MISSIONS_RESPONSE: 'GET_MISSIONS_RESPONSE',
    START_MISSION: 'START_MISSION',
    PAUSE_MISSION: 'PAUSE_MISSION',
    REFRESH_SERVER_STATE: 'REFRESH_SERVER_STATE'
};

const getMissions = (): SocketAction => ({
    type: Types.GET_MISSIONS,
    payload: null,
    meta: {
        socket: true,
        method: 'GetMissions',
        empty: true,
        recipient: '',
        command: ''
    }
});

const startMission = (id: string): SocketAction => ({
    type: Types.START_MISSION,
    payload: id,
    meta: {
        socket: true,
        method: 'StartMission',
        empty: false,
        recipient: '',
        command: ''
    }
});

const pauseMission = (): SocketAction => ({
    type: Types.PAUSE_MISSION,
    payload: null,
    meta: {
        socket: true,
        method: 'PauseMission',
        empty: true,
        recipient: '',
        command: ''
    }
});

export default {
    Types,
    startMission,
    pauseMission,
    getMissions
};
