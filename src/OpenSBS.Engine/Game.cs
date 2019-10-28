using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OpenSBS.Engine.Messages;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Engine
{
    public class Game : Singleton<Game>
    {
        private readonly ICollection<IUpdatable> _entities;
        private readonly IDictionary<string, Brain> _brains;
        private Scenario _scenario;

        public event EventHandler<string> StateRefreshEventHandler;

        public Game()
        {
            _entities = new List<IUpdatable>();
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
            _entities.Add(brain);
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
            var globalState = "";
            foreach (var entity in _entities)
            {
                entity.Update(timeSpan);
                globalState += entity.State();
            }

            _scenario.Update(timeSpan);
            StateRefreshEventHandler?.Invoke(this, globalState);
        }
    }
}
