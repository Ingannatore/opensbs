import SocketAction from '../interfaces/socket-action';

const Types = {
    GET_SCENARIOS: 'GET_SCENARIOS',
    GET_SCENARIOS_RESPONSE: 'GET_SCENARIOS_RESPONSE',
    START_SCENARIO: 'START_SCENARIO',
    PAUSE_SCENARIO: 'PAUSE_SCENARIO',
    REFRESH_SERVER_STATE: 'REFRESH_SERVER_STATE'
};

const getScenarios = (): SocketAction => ({
    type: Types.GET_SCENARIOS,
    payload: null,
    meta: {
        socket: true,
        method: 'GetScenarios',
        empty: true,
        path: null
    }
});

const startScenario = (scenarioId: string): SocketAction => ({
    type: Types.START_SCENARIO,
    payload: scenarioId,
    meta: {
        socket: true,
        method: 'StartScenario',
        empty: false,
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
    pauseScenario,
    getScenarios
};
