import ReduxAction from "../../store/models/redux-action";
import {defaultState, RadarState} from "./state";
import Actions from "./actions";

const reducer = (state: RadarState = defaultState, action: ReduxAction) => {
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
    }

    return state;
};

export default reducer;
