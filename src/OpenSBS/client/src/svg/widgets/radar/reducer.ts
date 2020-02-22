import Action from '../../../store/models/action';
import {defaultState, RadarState, RadarRanges} from './state';
import Actions from './actions';

export default (state: RadarState = defaultState, action: Action) => {
    switch (action.type) {
        case Actions.Types.TOGGLE_DIRECTIONS_OVERLAY:
            return {
                ...state,
                enableDirectionsOverlay: !state.enableDirectionsOverlay
            };
        case Actions.Types.TOGGLE_RANGES_OVERLAY:
            return {
                ...state,
                enableRangesOverlay: !state.enableRangesOverlay
            };
        case Actions.Types.TOGGLE_WEAPONS_OVERLAY:
            return {
                ...state,
                enableWeaponsOverlay: !state.enableWeaponsOverlay
            };
        case Actions.Types.ZOOM_IN:
            return {
                ...state,
                zoomLevel: Math.min(state.zoomLevel + 1, RadarRanges.length),
            };
        case Actions.Types.ZOOM_OUT:
            return {
                ...state,
                zoomLevel: Math.max(state.zoomLevel - 1, 0),
            };
    }

    return state;
};
