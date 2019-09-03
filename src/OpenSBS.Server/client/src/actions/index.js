const Types = {
    UPDATE_STATE: 'UPDATE_STATE',
    REFRESH_STATE: 'REFRESH_STATE',
};

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
    updateState
};
