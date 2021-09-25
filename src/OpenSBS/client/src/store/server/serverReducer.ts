import ClientAction from '../clientAction';
import ServerActions from './serverActions';
import ServerState from './serverState';

const defaultState: ServerState = {
    isReady: false,
    isRunning: false,
    lastTick: 0,
    lastDeltaT: 0,
    missions: [],
    spaceships: [],
};

export default (state = defaultState, action: ClientAction) => {
    if (action.type === ServerActions.Types.REFRESH_SERVER_STATE && action.payload) {
        return {...state, ...JSON.parse(action.payload)};
    }

    return state;
};
