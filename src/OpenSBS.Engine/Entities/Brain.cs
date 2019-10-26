using System;
using System.Threading.Tasks;
using OpenSBS.Engine.Commands;

namespace OpenSBS.Engine.Entities
{
    public abstract class Brain : IUpdatable
    {
        protected readonly Entity Entity;
        protected readonly CommandsQueue Commands;
        public string Id => Entity.Id;

        protected Brain(Entity entity)
        {
            Commands = new CommandsQueue();
            Entity = entity;
        }

        public async Task EnqueueCommand(Command command)
        {
            await Commands.Enqueue(command);
        }

        public virtual void Update(TimeSpan timeSpan)
        {
            Entity.Update(timeSpan);
        }

        public string State()
        {
            return Entity.State();
        }
    }
}
