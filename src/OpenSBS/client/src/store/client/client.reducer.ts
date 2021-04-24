import ActionModel from '../action.model';
import ClientActions from './client.actions';
import ClientStateModel from './client-state.model';

const defaultState: ClientStateModel = {
    target: null,
};

export default (state = defaultState, action: ActionModel) => {
    if (action.type === ClientActions.Types.SET_TARGET && action.payload) {
        return {...state, target: action.payload};
    }

    if (action.type === ClientActions.Types.RESET_TARGET) {
        return {...state, target: null};
    }

    return state;
};
