import Actions from "./actions";
import State from "./state";

const radarRanges = [10, 7.5, 5, 2];

const reducer = (state = State.defaultState, action) => {
    let newResolution = null;

    switch (action.type) {
        case Actions.Types.INCREASE_ZOOM:
            newResolution = Math.min(3, state[State.Keys.RESOLUTION] + 1);
            break;
        case Actions.Types.DECREASE_ZOOM:
            newResolution = Math.max(0, state[State.Keys.RESOLUTION] - 1);
            break;
        default:
            newResolution = null;
    }

    if (newResolution !== null) {
        return {
            ...state,
            [State.Keys.RESOLUTION]: newResolution,
            [State.Keys.RANGE]: radarRanges[newResolution]
        };
    }

    return state;
};

export default reducer;
