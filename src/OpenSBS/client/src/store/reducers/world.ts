﻿import WorldActions from '../actions/world';

const defaultState = {
    ship: null,
    entities: []
};

export default (state = defaultState, action: any) => {
    if (action.type !== WorldActions.Types.REFRESH_WORLD_STATE) {
        return state;
    }

    let newState = action.payload;
    if (typeof newState === 'string') {
        newState = JSON.parse(newState);
    }

    return {...state, ...newState};
};