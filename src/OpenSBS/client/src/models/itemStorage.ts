import ItemStack from 'models/itemStack';

export default interface ItemStorage {
    capacity: number,
    items: ItemStack[],
    usedCapacity: number,
}
