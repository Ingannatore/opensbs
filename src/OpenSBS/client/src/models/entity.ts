import Vector3 from 'models/vector3';
import Item from 'models/item';
import EntityModule from 'modules/entityModule';
import ItemStorage from 'models/itemStorage';

export default interface Entity extends Item {
    callSign: string,
    size: number,
    position: Vector3,
    bearing: number,
    linearSpeed: number,
    modules: Array<Partial<EntityModule>>
    cargo: ItemStorage | null,
}
