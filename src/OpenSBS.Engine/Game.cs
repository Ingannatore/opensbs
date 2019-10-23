using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using OpenSBS.Engine.Commands;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Engine
{
    public class Game
    {
        private static readonly Lazy<Game> _instance = new Lazy<Game>(() => new Game());
        private readonly ICollection<IUpdatable> _entityList;
        private readonly Ship _myShip;
        private Timer _timer;
        private DateTime _lastTick;

        public static Game Instance => _instance.Value;
        public event EventHandler<string> StateRefreshEventHandler;

        public Game()
        {
            // TODO : init game, build something?
            _entityList = new List<IUpdatable>();
            _myShip = new Ship();
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
            await _myShip.EnqueueCommand(command);
        }

        private void OnTick(object state)
        {
            var now = DateTime.Now;
            _lastTick = now;

            _myShip.Update(now - _lastTick);
            StateRefreshEventHandler?.Invoke(this, _myShip.State);

            foreach (var entity in _entityList)
            {
                entity.Update();
            }
        }
    }
}
