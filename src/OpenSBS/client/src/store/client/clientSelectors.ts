import State from '../state';
import Item from '../../models/item';
import EntityTrace from '../../models/entityTrace';

const getRadarScale = (state: State): number => {
    return state.client.radarScale;
}

const getMapScale = (state: State): number => {
    return state.client.radarScale;
}

const getSelectedTarget = (state: State): EntityTrace | null => {
    return state.client.selectedTarget;
}

const getSelectedAmmo = (state: State): Item | null => {
    return state.client.selectedAmmo;
}

export default {
    getRadarScale,
    getMapScale,
    getSelectedTarget,
    getSelectedAmmo,
}
