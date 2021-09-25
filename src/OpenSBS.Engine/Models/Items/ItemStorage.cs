namespace OpenSBS.Engine.Models.Items
{
    public class ItemStorage
    {
        public int Capacity { get; }
        public ItemCollection Items { get; }

        public static ItemStorage Create(int capacity)
        {
            return new ItemStorage(capacity);
        }

        private ItemStorage(int capacity)
        {
            Capacity = capacity;
            Items = new ItemCollection();
        }

        public ItemStack Extract(string itemId, int quantity = 1)
        {
            return Items.Contains(itemId) ? Items.Extract(itemId, quantity) : null;
        }

        public void Add(Item item, int quantity = 1)
        {
            Items.Add(item, quantity);
        }

        public void Add(ItemStack stack)
        {
            Items.Add(stack.Item, stack.Quantity);
        }
    }
}
