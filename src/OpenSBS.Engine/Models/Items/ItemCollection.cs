using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace OpenSBS.Engine.Models.Items
{
    public class ItemCollection : IEnumerable<ItemStack>
    {
        public int TotalMass => _items.Values.Sum(item => item.Mass);

        private readonly IDictionary<string, ItemStack> _items;

        public ItemCollection()
        {
            _items = new Dictionary<string, ItemStack>();
        }

        public bool Contains(string id)
        {
            return _items.ContainsKey(id);
        }

        public void Add(Item item, int quantity)
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

        public void Remove(string id, int quantity)
        {
            if (!_items.ContainsKey(id))
            {
                return;
            }

            var item = _items[id];
            if (quantity == 0 || !item.HasQuantity(quantity))
            {
                _items.Remove(id);
                return;
            }

            item.Decrement(quantity);
        }

        public void Clear()
        {
            _items.Clear();
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
