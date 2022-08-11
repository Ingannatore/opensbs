import Entity from "../../models/entity";
import {createSlice} from "@reduxjs/toolkit";

const initialState: Entity = {
    id: "",
    type: "",
    name: "",
    callSign: "",
    mass: 0,
    size: 0,
    position: {x: 0, y: 0, z: 0},
    bearing: 0,
    linearSpeed: 0,
    modules: [],
    cargo: null,
};

const spaceshipSlice = createSlice({
    name: 'spaceship',
    initialState: initialState,
    reducers: {
        refresh(state, action) {
            return {...state, ...JSON.parse(action.payload)};
        },
    }
});

export const {refresh} = spaceshipSlice.actions
export default spaceshipSlice.reducer
