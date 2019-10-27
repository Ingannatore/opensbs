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
        private readonly ICollection<IUpdatable> _entityList;
        private readonly IDictionary<string, Brain> _brains;

        public static Game Instance => SingletonInstance.Value;
        public event EventHandler<string> StateRefreshEventHandler;

        public Game()
        {
            // TODO : init game, build something?
            _entityList = new List<IUpdatable>();
            _brains = new Dictionary<string, Brain>();
            AddBrain(new PlayerBrain());
        }

        public void AddEntity(Entity entity)
        {
            _entityList.Add(entity);
        }

        public void AddBrain(Brain brain)
        {
            _entityList.Add(brain);
            _brains.Add(brain.Id, brain);
        }

        public void RegisterStateRefreshEventHandler(EventHandler<string> handler)
        {
            StateRefreshEventHandler -= handler;
            StateRefreshEventHandler += handler;
        }

        public async Task EnqueueCommand(Command command)
        {
            // TODO : routing command to destination entity (with brain)
            await _brains[command.Recipient].EnqueueCommand(command);
        }

        public void OnTick(object state, TimeSpan timeSpan)
        {
            var globalState = "";
            foreach (var entity in _entityList)
            {
                entity.Update(timeSpan);
                globalState += entity.State();
            }

            StateRefreshEventHandler?.Invoke(this, globalState);
        }
    }
}
