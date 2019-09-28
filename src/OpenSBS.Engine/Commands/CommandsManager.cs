using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OpenSBS.Engine.Commands
{
    public abstract class CommandsManager
    {
        private readonly IDictionary<Type, ICommandHandler> _handlers;
        private readonly CommandsQueue _queue;

        protected CommandsManager(CommandsQueue queue)
        {
            _handlers = new Dictionary<Type, ICommandHandler>();
            _queue = queue ?? throw new ArgumentNullException(nameof(queue));
        }

        protected void RegisterHandler(Type commandType, ICommandHandler handler)
        {
            _handlers.Add(commandType, handler);
        }

        public async Task EnqueueCommand(Command command)
        {
            await _queue.Enqueue(command);
        }

        public void ConsumeCommands()
        {
            while (!_queue.Empty)
            {
                var nextCommand = _queue.Dequeue();
                _handlers[nextCommand.GetType()].Handle(nextCommand);
            }
        }
    }
}
