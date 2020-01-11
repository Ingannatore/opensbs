import SocketAction from '../interfaces/socket-action';

const Types = {
    START_SCENARIO: 'START_SCENARIO',
    PAUSE_SCENARIO: 'PAUSE_SCENARIO',
    REFRESH_SERVER_STATE: 'REFRESH_SERVER_STATE'
};

const startScenario = (): SocketAction => ({
    type: Types.START_SCENARIO,
    payload: null,
    meta: {
        socket: true,
        method: 'StartScenario',
        empty: true,
        path: null
    }
});

const pauseScenario = (): SocketAction => ({
    type: Types.PAUSE_SCENARIO,
    payload: null,
    meta: {
        socket: true,
        method: 'PauseScenario',
        empty: true,
        path: null
    }
});

export default {
    Types,
    startScenario,
    pauseScenario
};
