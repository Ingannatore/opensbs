const Types = {
    START_SCENARIO: 'START_SCENARIO',
    UPDATE_STATE: 'UPDATE_STATE',
    REFRESH_STATE: 'REFRESH_STATE',
};

const startScenario = () => ({
    type: Types.START_SCENARIO,
    payload: null,
    socket: {
        send: true
    }
});

const updateState = (key, value) => ({
    type: Types.UPDATE_STATE,
    payload: {
        key: key,
        value: value
    },
    socket: {
        send: true
    }
});

export default {
    Types,
    startScenario,
    updateState
};
