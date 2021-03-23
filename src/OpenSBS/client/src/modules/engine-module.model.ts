import {EntityModuleModel} from '../models/entity-module.model';

export interface EngineModuleModel extends EntityModuleModel {
    throttle: number,
    rudder: number,
    maximumSpeed: number,
    acceleration: number,
    deceleration: number,
    rotationSpeed: number,
}
