using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OpenSBS.Engine.Messages;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Engine
{
    public class Game : Singleton<Game>
    {
        private readonly ICollection<Entity> _entities;
        private readonly IDictionary<string, Brain> _brains;
        private Scenario _scenario;

        public event EventHandler<string> StateRefreshEventHandler;

        public Game()
        {
            _entities = new List<Entity>();
            _brains = new Dictionary<string, Brain>();
        }

        public void Initialize(Scenario scenario)
        {
            _entities.Clear();
            _brains.Clear();

            _scenario = scenario;
            _scenario.Initialize();
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
            await _brains[message.Recipient].EnqueueMessage(message);
        }

        public void RegisterStateRefreshEventHandler(EventHandler<string> handler)
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

            _scenario.Update(timeSpan);
            StateRefreshEventHandler?.Invoke(this, _entities.First().State());
        }
    }
}
