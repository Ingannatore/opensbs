import ServerActions from '../actions/server';

const defaultState = {
    isReady: false,
    isRunning: false,
    scenarios: []
};

const parsePayload = (payload: any) => {
    if (typeof payload === 'string') {
        return JSON.parse(payload);
    }

    return payload;
};

const server = (state = defaultState, action: any) => {
    if (action.type === ServerActions.Types.GET_SCENARIOS_RESPONSE) {
        const scenarios = parsePayload(action.payload);
        return { ...state, scenarios: scenarios }
    }

    if (action.type === ServerActions.Types.REFRESH_SERVER_STATE) {
        const newState = parsePayload(action.payload);
        return {...state, ...newState};
    }

    return state;
};

export default server;
