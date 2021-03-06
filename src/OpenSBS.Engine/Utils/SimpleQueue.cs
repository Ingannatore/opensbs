﻿using System;
using System.Collections.Generic;

namespace OpenSBS.Engine.Utils
{
    public class SimpleQueue<T> where T : class
    {
        private readonly Queue<T> _queue;

        public SimpleQueue()
        {
            _queue = new Queue<T>();
        }

        public void Enqueue(T item)
        {
            _queue.Enqueue(item);
        }

        public T Dequeue()
        {
            try
            {
                return _queue.Dequeue();
            }
            catch (InvalidOperationException)
            {
                return null;
            }
        }

        public IEnumerable<T> DequeueAll()
        {
            for (var i = 0; i < _queue.Count && _queue.Count > 0; i++)
            {
                yield return _queue.Dequeue();
            }
        }
    }
}
