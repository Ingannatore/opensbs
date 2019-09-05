import Actions from "../actions";

const rootReducer = (state = {}, action) => {
    if (action.type !== Actions.Types.REFRESH_STATE) {
        return state;
    }

    let newState = action.payload;
    if (typeof newState === 'string') {
        newState = JSON.parse(newState);
    }

    return {...state, ...newState};
};

export default rootReducer;
