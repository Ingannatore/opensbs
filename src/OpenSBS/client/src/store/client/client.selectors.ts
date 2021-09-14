import {StateModel} from '../state.model';

const getTarget = (state: StateModel): string | null => {
    return state.client.target;
}

const getSelectedAmmo = (state: StateModel): string | null => {
    return state.client.selectedAmmo;
}

export default {
    getTarget,
    getSelectedAmmo,
}
