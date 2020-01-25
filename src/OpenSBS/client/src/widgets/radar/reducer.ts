import Action from '../../store/models/action';
import {defaultState, RadarState} from './state';
import Actions from "./actions";

const radarRanges = [10000, 7500, 5000, 2000, 1000];
const getNextRadarRange = (currentRange: number, delta: number) => {
    const currentIndex = Math.max(0, radarRanges.indexOf(currentRange));
    const nextIndex = Math.min(Math.max(currentIndex + delta, 0), radarRanges.length - 1);
    return radarRanges[nextIndex];
};

export default (state: RadarState = defaultState, action: Action) => {
    switch (action.type) {
        case Actions.Types.TOGGLE_DIRECTION_LINES:
            return {
                ...state,
                enableDirectionLines: !state.enableDirectionLines
            };
        case Actions.Types.TOGGLE_RANGE_CIRCLES:
            return {
                ...state,
                enableRangeCircles: !state.enableRangeCircles
            };
        case Actions.Types.TOGGLE_RANGE_TEXTS:
            return {
                ...state,
                enableRangeTexts: !state.enableRangeTexts
            };
        case Actions.Types.TOGGLE_WEAPONS_ARCS:
            return {
                ...state,
                enableWeaponsArcs: !state.enableWeaponsArcs
            };
        case Actions.Types.ZOOM_IN:
            return {
                ...state,
                radarRange: getNextRadarRange(state.radarRange, 1)
            };
        case Actions.Types.ZOOM_OUT:
            return {
                ...state,
                radarRange: getNextRadarRange(state.radarRange, -1)
            };
    }

    return state;
};
