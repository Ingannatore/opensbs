using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Internal;

namespace OpenSBS.Server
{
    public class EventsQueue
    {
        private readonly Queue<UpdateStateEvent> _queue;
        public bool HasEvents => _queue.Any();

        public EventsQueue()
        {
            _queue = new Queue<UpdateStateEvent>();
        }

        public void AddEvent(UpdateStateEvent updateStateEvent)
        {
            _queue.Enqueue(updateStateEvent);
        }

        public UpdateStateEvent ReadEvent()
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
