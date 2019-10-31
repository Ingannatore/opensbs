const Types = {
    START_SCENARIO: 'START_SCENARIO',
    PAUSE_SCENARIO: 'PAUSE_SCENARIO',
};

const startScenario = () => ({
    type: Types.START_SCENARIO,
    payload: null,
    meta: {
        socket: true,
        method: 'StartScenario',
        path: null
    }
});

const pauseScenario = () => ({
    type: Types.PAUSE_SCENARIO,
    payload: null,
    meta: {
        socket: true,
        method: 'PauseScenario',
        path: null
    }
});

export default {
    Types,
    startScenario,
    pauseScenario
};
