import { combineReducers } from 'redux'
import server from './server';
import world from './world';
import radar from '../../svg/widgets/radar/reducer';

export default combineReducers({
    server,
    world,
    radar
});
