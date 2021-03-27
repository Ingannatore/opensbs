import ServerActions from './server.actions';
import ServerStateModel from './server-state.model';
import ActionModel from '../action.model';

const defaultState: ServerStateModel = {
    isReady: false,
    isRunning: false,
    lastTick: 0,
    lastDeltaT: 0,
    missions: [],
    spaceships: [],
};

export default (state = defaultState, action: ActionModel) => {
    if (action.type === ServerActions.Types.REFRESH_SERVER_STATE && action.payload) {
        return {...state, ...JSON.parse(action.payload)};
    }

    return state;
};
