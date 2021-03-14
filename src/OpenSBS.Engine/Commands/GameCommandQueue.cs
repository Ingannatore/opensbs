using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenSBS.Engine.Commands
{
    public class GameCommandQueue
    {
        private readonly Queue<GameCommand> _queue;
        public bool Empty => !_queue.Any();

        public GameCommandQueue()
        {
            _queue = new Queue<GameCommand>();
        }

        public async Task Enqueue(GameCommand message)
        {
            await Task.Run(() => _queue.Enqueue(message));
        }

        public GameCommand Dequeue()
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

        public IEnumerable<GameCommand> DequeueAll()
        {
            for (var i = 0; i < _queue.Count && _queue.Count > 0; i++)
            {
                yield return _queue.Dequeue();
            }
        }
    }
}
