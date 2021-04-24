import { combineReducers } from 'redux'
import client from './client/client.reducer';
import server from './server/server.reducer';
import spaceship from './spaceship/spaceship.reducer';

export default combineReducers({
    client,
    server,
    spaceship,
});
