using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Modules.Storage
{
    public abstract class StorageModule : Module
    {
        public int Space { get; protected set; }
        public ItemCollection Items { get; }

        protected StorageModule(string id, string name) : base(id, ModuleType.Storage, name)
        {
            Items = new ItemCollection();
        }

        public void Add(Item item, int quantity)
        {
            Items.Add(item, quantity);
        }
    }
}
