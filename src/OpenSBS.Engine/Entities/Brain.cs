using System;
using System.Threading.Tasks;
using OpenSBS.Engine.Messages;

namespace OpenSBS.Engine.Entities
{
    public class Brain : IUpdatable
    {
        protected readonly MessageQueue MessageQueue;
        public Entity Entity { get; }
        public string Id => Entity.Id;

        public Brain(Entity entity)
        {
            MessageQueue = new MessageQueue();
            Entity = entity;
        }

        public async Task EnqueueMessage(Message message)
        {
            await MessageQueue.Enqueue(message);
        }

        public virtual void Update(TimeSpan timeSpan)
        {
            if (Entity is ArtificialEntity spaceEntity)
            {
                while (!MessageQueue.Empty)
                {
                    spaceEntity.HandleMessage(MessageQueue.Dequeue());
                }
            }

            Entity.Update(timeSpan);
        }
    }
}
