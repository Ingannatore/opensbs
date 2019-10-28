const Types = {
    START_SCENARIO: 'START_SCENARIO',
    UPDATE_STATE: 'UPDATE_STATE',
    REFRESH_STATE: 'REFRESH_STATE',
};

const startScenario = () => ({
    type: Types.START_SCENARIO,
    meta: {
        socket: true
    }
});

const updateState = (key, value) => ({
    type: Types.UPDATE_STATE,
    payload: {
        key: key,
        value: value
    },
    meta: {
        socket: true
    }
});

export default {
    Types,
    startScenario,
    updateState
};
