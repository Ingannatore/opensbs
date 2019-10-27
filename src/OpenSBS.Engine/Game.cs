using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OpenSBS.Engine.Commands;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Engine
{
    public class Game
    {
        private static readonly Lazy<Game> SingletonInstance = new Lazy<Game>(() => new Game());
        private readonly ICollection<IUpdatable> _entities;
        private readonly IDictionary<string, Brain> _brains;
        private Scenario _scenario;

        public static Game Instance => SingletonInstance.Value;
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

        public async Task EnqueueCommand(Command command)
        {
            await _brains[command.Recipient].EnqueueCommand(command);
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
