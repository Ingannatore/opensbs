using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenSBS.Engine.Messages
{
    public class MessageQueue
    {
        private readonly Queue<Message> _queue;
        public bool Empty => !_queue.Any();

        public MessageQueue()
        {
            _queue = new Queue<Message>();
        }

        public async Task Enqueue(Message message)
        {
            await Task.Run(() => _queue.Enqueue(message));
        }

        public Message Dequeue()
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
