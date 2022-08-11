import State from '../state';
import Item from '../../models/item';
import EntityTrace from '../../models/entityTrace';
import Vector2 from '../../models/Vector2';

const getRadarScale = (state: State): number => {
    return state.client.radarScale;
}

const getSelectedTarget = (state: State): EntityTrace | null => {
    return state.client.selectedTarget;
}

const getSelectedAmmo = (state: State): Item | null => {
    return state.client.selectedAmmo;
}

const getSelectedSector = (state: State): Vector2 => {
    return state.client.selectedSector;
}

const clientSelectors = {
    getRadarScale,
    getSelectedTarget,
    getSelectedAmmo,
    getSelectedSector,
}

export default clientSelectors
