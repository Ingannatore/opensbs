import Entity from '../models/entity';
import ClientState from './client/clientState';
import ServerState from './server/serverState';

export default interface State {
    spaceship: Entity,
    client: ClientState,
    server: ServerState,
}
