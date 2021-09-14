namespace OpenSBS.Engine.Models
{
    public class ItemStack
    {
        public Item Item { get; }
        public int Quantity { get; protected set; }

        public ItemStack(Item item, int quantity)
        {
            Item = item;
            Quantity = quantity;
        }

        public void Increment(int quantity)
        {
            Quantity += quantity;
        }
    }
}
