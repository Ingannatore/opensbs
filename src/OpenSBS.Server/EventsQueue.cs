using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Internal;

namespace OpenSBS.Server
{
    public class EventsQueue
    {
        private readonly Queue<SocketEvent> _queue;
        public bool HasEvents => _queue.Any();

        public EventsQueue()
        {
            _queue = new Queue<SocketEvent>();
        }

        public void AddEvent(SocketEvent socketEvent)
        {
            _queue.Enqueue(socketEvent);
        }

        public SocketEvent ReadEvent()
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
    }
}
