import ItemStackModel from './item-stack.model';

export default interface ItemStorageModel {
    capacity: number,
    items: ItemStackModel[],
    usedCapacity: number,
}
