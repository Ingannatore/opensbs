import ServerActions from '../actions/server';

const defaultState = {
    isReady: false,
    isRunning: false
};

const server = (state = defaultState, action: any) => {
    if (action.type !== ServerActions.Types.REFRESH_SERVER_STATE) {
        return state;
    }

    let newState = action.payload;
    if (typeof newState === 'string') {
        newState = JSON.parse(newState);
    }

    return {...state, ...newState};
};

export default server;
