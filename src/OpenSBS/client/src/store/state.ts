import Entity from 'models/entity';
import ClientState from 'store/client/clientState';
import ServerState from 'store/server/serverState';

export default interface State {
    spaceship: Entity,
    client: ClientState,
    server: ServerState,
}
