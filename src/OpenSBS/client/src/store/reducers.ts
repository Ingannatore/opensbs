import { combineReducers } from 'redux'
import server from './server/server.reducer';
import spaceship from './spaceship/spaceship.reducer';

export default combineReducers({
    server,
    spaceship,
});
