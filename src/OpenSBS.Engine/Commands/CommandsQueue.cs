using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OpenSBS.Engine.Commands
{
    public class CommandsQueue
    {
        private readonly Queue<Command> _queue;
        public bool Empty => !_queue.Any();

        public CommandsQueue()
        {
            _queue = new Queue<Command>();
        }

        public async Task Enqueue(Command command)
        {
            await Task.Run(() => _queue.Enqueue(command));
        }

        public Command Dequeue()
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
