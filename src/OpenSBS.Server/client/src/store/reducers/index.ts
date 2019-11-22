import { combineReducers } from 'redux'
import server from "./server";
import radarReducer from "../../widgets/radar/reducer";

export default combineReducers({
    server,
    radarReducer
});
