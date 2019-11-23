import { combineReducers } from 'redux'
import server from "./server";
import radar from "../../widgets/radar/reducer";

export default combineReducers({
    server,
    radar
});
