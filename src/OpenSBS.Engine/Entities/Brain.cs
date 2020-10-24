using System;
using System.Threading.Tasks;
using OpenSBS.Core.Commands;

namespace OpenSBS.Engine.Entities
{
    public class Brain : IUpdatable
    {
        protected readonly GameCommandQueue CommandQueue;
        public Entity Entity { get; }
        public string Id => Entity.Id;

        public Brain(Entity entity)
        {
            CommandQueue = new GameCommandQueue();
            Entity = entity;
        }

        public async Task EnqueueCommand(GameCommand command)
        {
            await CommandQueue.Enqueue(command);
        }

        public virtual void Update(TimeSpan timeSpan)
        {
            if (Entity is ArtificialEntity spaceEntity)
            {
                while (!CommandQueue.Empty)
                {
                    spaceEntity.HandleMessage(CommandQueue.Dequeue());
                }
            }

            Entity.Update(timeSpan);
        }
    }
}
