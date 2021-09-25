import State from '../state';
import EntityTrace from '../../models/entityTrace';

const getZoomFactor = (state: State): number => {
    return state.client.zoomFactor;
}

const getSelectedTarget = (state: State): EntityTrace | null => {
    return state.client.selectedTarget;
}

const getSelectedAmmo = (state: State): string | null => {
    return state.client.selectedAmmo;
}

export default {
    getZoomFactor,
    getSelectedTarget,
    getSelectedAmmo,
}
