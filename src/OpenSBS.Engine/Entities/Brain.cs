using System;
using System.Threading.Tasks;
using OpenSBS.Engine.Commands;

namespace OpenSBS.Engine.Entities
{
    public abstract class Brain : IUpdatable
    {
        protected readonly Entity _entity;
        protected readonly CommandsQueue _commands;
        public string Id
        {
            get => _entity.Id; 
        }

        public string State
        {
            get => _entity.State;
        }

        protected Brain(Entity entity)
        {
            _entity = entity;
            _commands = new CommandsQueue();
        }

        public async Task EnqueueCommand(Command command)
        {
            await _commands.Enqueue(command);
        }

        public virtual void Update(TimeSpan timeSpan)
        {
            _entity.Update(timeSpan);
        }
    }
}
