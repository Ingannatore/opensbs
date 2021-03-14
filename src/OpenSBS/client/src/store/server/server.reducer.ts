import ServerActions from './server.actions';
import ServerState from './server-state.model';
import Action from '../action.model';

const defaultState: ServerState = {
    isReady: false,
    isRunning: false,
    lastTick: 0,
    lastDeltaT: 0,
    missions: [],
};

export default (state = defaultState, action: Action) => {
    if (action.type === ServerActions.Types.REFRESH_SERVER_STATE && action.payload) {
        return {...state, ...JSON.parse(action.payload)};
    }

    return state;
};
