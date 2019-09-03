using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Internal;

namespace OpenSBS.Server
{
    public class EventsQueue
    {
        private readonly Queue<SetStateEvent> _queue;
        public bool HasEvents => _queue.Any();

        public EventsQueue()
        {
            _queue = new Queue<SetStateEvent>();
        }

        public void AddEvent(SetStateEvent setStateEvent)
        {
            _queue.Enqueue(setStateEvent);
        }

        public SetStateEvent ReadEvent()
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
