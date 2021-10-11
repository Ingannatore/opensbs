import State from '../state';
import Item from '../../models/item';
import EntityTrace from '../../models/entityTrace';
import Vector3 from '../../models/vector3';

const getRadarScale = (state: State): number => {
    return state.client.radarScale;
}

const getMapScale = (state: State): number => {
    return state.client.mapScale;
}

const getMapCenter = (state: State): Vector3 => {
    return state.client.mapCenter;
}

const getMapGridVisible = (state: State): boolean => {
    return state.client.mapGridVisible;
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
    getMapCenter,
    getMapGridVisible,
    getSelectedTarget,
    getSelectedAmmo,
}
