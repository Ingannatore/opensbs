import { combineReducers } from 'redux'
import server from './server/server.reducer';
import world from './reducers/world';
import radar from '../svg/widgets/radar/reducer';

export default combineReducers({
    server,
    world,
    radar
});
