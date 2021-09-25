import State from '../state';
import Item from '../../models/item';
import EntityTrace from '../../models/entityTrace';

const getZoomFactor = (state: State): number => {
    return state.client.zoomFactor;
}

const getSelectedTarget = (state: State): EntityTrace | null => {
    return state.client.selectedTarget;
}

const getSelectedAmmo = (state: State): Item | null => {
    return state.client.selectedAmmo;
}

export default {
    getZoomFactor,
    getSelectedTarget,
    getSelectedAmmo,
}
