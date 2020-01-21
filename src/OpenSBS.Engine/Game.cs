using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OpenSBS.Engine.Messages;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Engine
{
    public class Game : Singleton<Game>
    {
        private readonly ICollection<Entity> _entities;
        private readonly IDictionary<string, Brain> _brains;
        private Mission _mission;

        public bool IsReady { get; protected set; }
        public event EventHandler<ICollection<Entity>> StateRefreshEventHandler;

        public Game()
        {
            _entities = new List<Entity>();
            _brains = new Dictionary<string, Brain>();

            IsReady = false;
        }

        public void Initialize(Mission mission)
        {
            IsReady = false;
            _entities.Clear();
            _brains.Clear();

            _mission = mission;
            _mission.Initialize();
            IsReady = true;
        }

        public void AddEntity(Entity entity)
        {
            _entities.Add(entity);
        }

        public void AddBrain(Brain brain)
        {
            AddEntity(brain.Entity);
            _brains.Add(brain.Id, brain);
        }

        public async Task EnqueueMessage(Message message)
        {
            await _brains[message.Recipient.EntityId].EnqueueMessage(message);
        }

        public void RegisterStateRefreshEventHandler(EventHandler<ICollection<Entity>> handler)
        {
            StateRefreshEventHandler -= handler;
            StateRefreshEventHandler += handler;
        }

        public void OnTick(object state, TimeSpan timeSpan)
        {
            foreach (var brain in _brains.Values)
            {
                brain.Update(timeSpan);
            }

            _mission.Update(timeSpan);
            StateRefreshEventHandler?.Invoke(this, _entities);
        }
    }
}
