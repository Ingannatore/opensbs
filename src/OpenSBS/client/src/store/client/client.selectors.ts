import {StateModel} from '../state.model';
import EntityTraceModel from '../../modules/entity-trace.model';

const getZoomFactor = (state: StateModel): number => {
    return state.client.zoomFactor;
}

const getSelectedTarget = (state: StateModel): EntityTraceModel | null => {
    return state.client.selectedTarget;
}

const getSelectedAmmo = (state: StateModel): string | null => {
    return state.client.selectedAmmo;
}

export default {
    getZoomFactor,
    getSelectedTarget,
    getSelectedAmmo,
}
