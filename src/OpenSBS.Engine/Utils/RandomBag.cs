using System;
using System.Collections.Generic;

namespace OpenSBS.Engine.Utils
{
    public class RandomBag<T>
    {
        private readonly IList<T> _items;
        private readonly Random _randomizer;

        public int Count => _items.Count;

        public RandomBag(Random randomizer, List<T> items = null)
        {
            _items = items ?? new List<T>();
            _randomizer = randomizer;
        }

        public bool Contains(T item)
        {
            return _items.Contains(item);
        }

        public void Add(T item, int times = 1)
        {
            for (var i = 0; i < times; i++)
            {
                _items.Add(item);
            }
        }

        public T Draw()
        {
            if (_items.Count == 0)
            {
                throw new Exception("Unable to draw from an empty RandomBag");
            }

            var index = _randomizer.Next(_items.Count);
            var item = _items[index];
            _items.RemoveAt(index);

            return item;
        }
    }
}
