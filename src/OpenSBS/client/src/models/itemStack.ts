import Item from 'models/item';

export default interface ItemStack {
    item: Item,
    quantity: number,
}
