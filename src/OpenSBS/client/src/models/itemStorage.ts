import ItemStack from './itemStack';

export default interface ItemStorage {
    capacity: number,
    items: ItemStack[],
    usedCapacity: number,
}
