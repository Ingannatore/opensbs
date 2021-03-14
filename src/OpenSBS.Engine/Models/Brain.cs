using System;
using System.Threading.Tasks;
using OpenSBS.Engine.Commands;
using OpenSBS.Engine.Spaceships;

namespace OpenSBS.Engine.Entities
{
    public class Brain
    {
        protected readonly GameCommandQueue CommandQueue;
        public SpaceThing Thing { get; }
        public string Id => Thing.Id;

        public Brain(SpaceThing thing)
        {
            CommandQueue = new GameCommandQueue();
            Thing = thing;
        }

        public async Task EnqueueCommand(GameCommand command)
        {
            await CommandQueue.Enqueue(command);
        }

        public virtual void Update(TimeSpan deltaT)
        {
            if (Thing is Spaceship spaceEntity)
            {
                while (!CommandQueue.Empty)
                {
                    spaceEntity.HandleCommand(CommandQueue.Dequeue());
                }
            }

            Thing.Update(deltaT);
        }
    }
}
