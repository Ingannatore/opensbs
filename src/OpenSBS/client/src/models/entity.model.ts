import Vector3 from './vector3';
import {EntityModuleModel} from './entity-module.model';

export interface EntityModel {
    id: string,
    type: string,
    name: string,
    callSign: string,
    mass: number,
    size: number,
    position: Vector3,
    direction: Vector3,
    linearSpeed: number,
    angularSpeed: number,
    modules: Array<Partial<EntityModuleModel>>
}
