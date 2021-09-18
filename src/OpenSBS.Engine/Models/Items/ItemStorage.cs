namespace OpenSBS.Engine.Models.Items
{
    public class ItemStorage
    {
        public int Capacity { get; }
        public ItemCollection Items { get; }

        public int UsedCapacity => Items.TotalMass;

        public static ItemStorage Create(int capacity)
        {
            return new ItemStorage(capacity);
        }

        private ItemStorage(int capacity)
        {
            Capacity = capacity;
            Items = new ItemCollection();
        }

        public bool Contains(string id)
        {
            return Items.Contains(id);
        }

        public void Add(Item item, int quantity = 1)
        {
            Items.Add(item, quantity);
        }

        public void Remove(string id, int quantity = 0)
        {
            Items.Remove(id, quantity);
        }
    }
}
