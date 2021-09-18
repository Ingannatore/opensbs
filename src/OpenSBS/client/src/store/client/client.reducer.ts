import ActionModel from '../action.model';
import ClientActions from './client.actions';
import ClientStateModel from './client-state.model';

const defaultState: ClientStateModel = {
    selectedTarget: null,
    selectedAmmo: null,
};

export default (state = defaultState, action: ActionModel) => {
    if (action.type === ClientActions.Types.SET_TARGET && action.payload) {
        return {...state, selectedTarget: action.payload};
    }

    if (action.type === ClientActions.Types.RESET_TARGET) {
        return {...state, selectedTarget: null};
    }

    if (action.type === ClientActions.Types.SET_AMMO && action.payload) {
        return {...state, selectedAmmo: action.payload};
    }

    if (action.type === ClientActions.Types.RESET_AMMO) {
        return {...state, selectedAmmo: null};
    }

    return state;
};
