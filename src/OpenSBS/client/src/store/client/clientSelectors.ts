import EntityTrace from 'models/entityTrace';
import Item from 'models/item';
import Vector2 from 'models/vector2';
import State from 'store/state';

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
