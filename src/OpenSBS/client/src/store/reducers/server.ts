import ServerActions from '../actions/server';

const defaultState = {
    isReady: false,
    isRunning: false,
    missions: []
};

const parsePayload = (payload: any) => {
    if (typeof payload === 'string') {
        return JSON.parse(payload);
    }

    return payload;
};

const server = (state = defaultState, action: any) => {
    if (action.type === ServerActions.Types.GET_MISSIONS_RESPONSE) {
        const missions = parsePayload(action.payload);
        return { ...state, missions: missions }
    }

    if (action.type === ServerActions.Types.REFRESH_SERVER_STATE) {
        const newState = parsePayload(action.payload);
        return {...state, ...newState};
    }

    return state;
};

export default server;
