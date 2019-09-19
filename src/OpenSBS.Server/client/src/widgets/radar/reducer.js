import Actions from "./actions";
import State from "./state";

const radarRanges = [10, 7.5, 5, 2];

const reducer = (state = State.defaultState, action) => {
    switch (action.type) {
        case Actions.Types.INCREASE_ZOOM:
            return {
                ...state,
                [State.Keys.RANGE]: radarRanges[Math.min(3, radarRanges.indexOf(state[State.Keys.RANGE]) + 1)]
            };
        case Actions.Types.DECREASE_ZOOM:
            return {
                ...state,
                [State.Keys.RANGE]: radarRanges[Math.max(0, radarRanges.indexOf(state[State.Keys.RANGE]) - 1)]
            };
        case Actions.Types.TOGGLE_DIRECTIONS:
            return {
                ...state,
                [State.Keys.DIRECTIONS_MARKERS]: !state[State.Keys.DIRECTIONS_MARKERS]
            };
        case Actions.Types.TOGGLE_RANGES:
            return {
                ...state,
                [State.Keys.RANGE_MARKERS]: !state[State.Keys.RANGE_MARKERS]
            };
        case Actions.Types.TOGGLE_TEXTS:
            return {
                ...state,
                [State.Keys.TEXT_MARKERS]: !state[State.Keys.TEXT_MARKERS]
            };
        case Actions.Types.TOGGLE_WEAPONS:
            return {
                ...state,
                [State.Keys.WEAPONS_MARKERS]: !state[State.Keys.WEAPONS_MARKERS]
            };
    }

    return state;
};

export default reducer;
