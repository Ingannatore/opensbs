import ServerActions from './server.actions';
import ServerState from './server-state.model';

const defaultState : ServerState = {
    isReady: false,
    isRunning: false,
    lastTick: 0,
    lastDeltaT: 0,
    missions: [],
};

export default (state = defaultState, action: any) => {
    if (action.type === ServerActions.Types.REFRESH_SERVER_STATE) {
        return {...state, ...action.payload};
    }

    return state;
};
