using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
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
        //private readonly Ship _myShip;
        private Timer _timer;
        private DateTime _lastTick;

        public static Game Instance => SingletonInstance.Value;
        public event EventHandler<string> StateRefreshEventHandler;

        public Game()
        {
            // TODO : init game, build something?
            _entityList = new List<IUpdatable>();
            _brains = new Dictionary<string, Brain>();
            //_myShip = new Ship(100);
            AddBrain(new PlayerBrain());
        }

        public void AddEntity(Entity entity) => _entityList.Add(entity);

        public void AddBrain(Brain brain)
        {
            _entityList.Add(brain);
            _brains.Add(brain.Id, brain);
        }

        public void Start()
        {
            _lastTick = DateTime.Now;
            _timer = new Timer(
                OnTick,
                null,
                TimeSpan.Zero,
                TimeSpan.FromMilliseconds(Math.Round(1000.0 / 1))
            );
        }

        public void Stop()
        {
            _timer?.Change(Timeout.Infinite, 0);
        }

        public async Task EnqueueCommand(Command command)
        {
            // TODO : routing command to destination entity (with brain)
            await _brains[command.Recipient].EnqueueCommand(command);
            //await _myShip.EnqueueCommand(command);
        }

        private void OnTick(object state)
        {
            var now = DateTime.Now;
            var globalState = new string("");
            foreach (var entity in _entityList)
            {
                entity.Update(now - _lastTick);
                globalState += entity.State;
            }
            StateRefreshEventHandler?.Invoke(this, globalState);
            _lastTick = now;
        }
    }
}
