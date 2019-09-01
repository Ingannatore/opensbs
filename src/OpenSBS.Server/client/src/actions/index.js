const Types = {
    SET_RUDDER: 'SET_RUDDER',
    RESET_RUDDER: 'RESET_RUDDER',
    UPDATE_STATE: 'UPDATE_STATE'
};

const setRudderAction = value => ({
    type: Types.SET_RUDDER,
    payload: value,
    socket: {
        send: true
    }
});

const resetRudderAction = () => ({
    type: Types.RESET_RUDDER,
    payload: null,
    socket: {
        send: true
    }
});

export default {
    Types,
    setRudderAction,
    resetRudderAction
};
