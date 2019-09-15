import { combineReducers } from 'redux'
import stateReducer from "./state";
import radarReducer from "../widgets/radar/reducer";

export default combineReducers({
    stateReducer,
    radarReducer
});
