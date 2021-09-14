import {EntityModuleModel} from '../models/entity-module.model';
import ItemStackModel from '../models/item-stack.model';

export default interface StorageModuleModel extends EntityModuleModel {
    space: number,
    items: ItemStackModel[],
}
