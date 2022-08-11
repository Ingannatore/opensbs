import ItemStorage from '../../models/itemStorage';
import ItemStack from '../../models/itemStack';

export default class CargoService {
    public static findItems(cargo: ItemStorage | undefined, category: string): ItemStack[] {
        return cargo?.items.filter(
            (stack: ItemStack) => stack.item.type.startsWith(`${category}.`)
        ) ?? [];
    }
}
