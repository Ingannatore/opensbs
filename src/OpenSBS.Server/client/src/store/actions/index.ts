const Types = {
    UPDATE_STATE: 'UPDATE_STATE',
    REFRESH_STATE: 'REFRESH_STATE',
};

const updateState = (key: string, value: any) => ({
    type: Types.UPDATE_STATE,
    payload: {
        key: key,
        value: value
    },
    meta: {
        socket: true,
        method: 'UpdateState',
        empty: false,
        path: 'PLAYER_SHIP'
    }
});

export default {
    Types,
    updateState
};
