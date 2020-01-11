import Vector3 from './vector3';
import EntityModule from './entity-module';

export default interface Entity {
    id: string,
    type: string,
    name: string,
    position: Vector3,
    rotation: Vector3,
    modules: Partial<EntityModule>[]
}
