import {createSlice} from '@reduxjs/toolkit';
import ServerState from 'store/server/serverState';

const initialState: ServerState = {
    isReady: false,
    isRunning: false,
    lastTick: 0,
    lastDeltaT: 0,
    missions: [],
    spaceships: [],
};

const serverSlice = createSlice({
    name: 'server',
    initialState: initialState,
    reducers: {
        refresh(state, action) {
            return {...state, ...JSON.parse(action.payload)};
        },
    }
});

export const {refresh} = serverSlice.actions
export default serverSlice.reducer
