using System;
using System.Threading.Tasks;
using OpenSBS.Engine.Messages;

namespace OpenSBS.Engine.Entities
{
    public abstract class Brain : IUpdatable
    {
        protected readonly Entity Entity;
        protected readonly MessageQueue Message;
        public string Id => Entity.Id;

        protected Brain(Entity entity)
        {
            Message = new MessageQueue();
            Entity = entity;
        }

        public async Task EnqueueMessage(Message message)
        {
            await Message.Enqueue(message);
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
