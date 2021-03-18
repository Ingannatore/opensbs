import ServerStateModel from './server/server-state.model';
import {EntityModel} from '../models/entity.model';

export interface StateModel {
    server: ServerStateModel,
    spaceship: EntityModel
}
