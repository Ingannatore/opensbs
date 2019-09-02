import Actions from "./actions";

const defaultState = {
    "ship.bearing": 0.0,
    "ship.rudder": 0
};

const rootReducer = (state = defaultState, action) => {
    if (action.type === Actions.Types.UPDATE_STATE) {
        let newState = action.payload;
        if (typeof newState === 'string') {
            newState = JSON.parse(newState);
        }

        return {...state, ...newState};
    }

    return state;
};

export default rootReducer;
