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
    meta: {
        socket: true,
        method: 'UpdateState',
        path: null
    }
});

export default {
    Types,
    updateState
};
