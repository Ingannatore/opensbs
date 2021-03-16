import { combineReducers } from 'redux'
import server from './server/server.reducer';
import world from './reducers/world';

export default combineReducers({
    server,
    world,
});
