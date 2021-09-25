import { combineReducers } from 'redux'
import client from './client/clientReducer';
import server from './server/serverReducer';
import spaceship from './spaceship/spaceshipReducer';

export default combineReducers({
    client,
    server,
    spaceship,
});
