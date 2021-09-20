import Vector3 from './vector3';
import ItemModel from './item.model';
import EntityModuleModel from './entity-module.model';
import ItemStorageModel from './item-storage.model';

export interface EntityModel extends ItemModel {
    callSign: string,
    size: number,
    position: Vector3,
    direction: Vector3,
    linearSpeed: number,
    angularSpeed: number,
    modules: Array<Partial<EntityModuleModel>>
    cargo: ItemStorageModel | null,
}
