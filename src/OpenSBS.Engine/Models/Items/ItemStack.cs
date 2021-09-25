using System;

namespace OpenSBS.Engine.Models.Items
{
    public class ItemStack
    {
        public Item Item { get; }
        public int Quantity { get; private set; }
        public int Mass => Item.Mass * Quantity;
        public bool IsEmpty => Quantity == 0;

        public static ItemStack Create(Item item, int quantity)
        {
            return new ItemStack(item, quantity);
        }

        public ItemStack(Item item, int quantity)
        {
            Item = item;
            Quantity = quantity;
        }

        public bool IsSameItem(ItemStack otherStack)
        {
            return Item.Id == otherStack.Item.Id;
        }

        public bool HasNoMoreQuantityThen(int quantity)
        {
            return Quantity <= quantity;
        }

        public void Increment(int quantity)
        {
            Quantity += quantity;
        }

        public void Decrement(int quantity)
        {
            Quantity = Math.Max(Quantity - quantity, 0);
        }

        public ItemStack Split(int quantity)
        {
            Decrement(quantity);
            return Create(Item, quantity);
        }
    }
}
