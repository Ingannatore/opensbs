using System.Collections;
using System.Collections.Generic;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Modules.Storage
{
    public class ItemCollection : IEnumerable<ItemStack>
    {
        private readonly IDictionary<string, ItemStack> _items;

        public ItemCollection()
        {
            _items = new Dictionary<string, ItemStack>();
        }

        public ItemStack Get(string id)
        {
            return _items[id];
        }

        public void Add(Item item, int quantity = 1)
        {
            if (!_items.ContainsKey(item.Id))
            {
                _items.Add(item.Id, new ItemStack(item, 0));
            }

            _items[item.Id].Increment(quantity);
        }

        public void Remove(string id)
        {
            _items.Remove(id);
        }

        public IEnumerator<ItemStack> GetEnumerator()
        {
            return _items.Values.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
