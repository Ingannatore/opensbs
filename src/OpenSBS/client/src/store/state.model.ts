import ClientStateModel from './client/client-state.model';
import ServerStateModel from './server/server-state.model';
import {EntityModel} from '../models/entity.model';

export interface StateModel {
    client: ClientStateModel,
    server: ServerStateModel,
    spaceship: EntityModel
}
