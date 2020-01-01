import Actions from '../actions';

const defaultState = {
    ship: null,
    entities: [],
    properties: {
        isReady: false,
        isRunning: false
    }
};

const server = (state = defaultState, action: any) => {
    if (action.type !== Actions.Types.REFRESH_STATE) {
        return state;
    }

    let newState = action.payload;
    if (typeof newState === 'string') {
        newState = JSON.parse(newState);
    }

    return {...state, ...newState};
};

export default server;
