const Types = {
    SET_STATE: 'SET_STATE',
    UPDATE_STATE: 'UPDATE_STATE',
};

const setState = (key, value) => ({
    type: Types.SET_STATE,
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
    setState
};
