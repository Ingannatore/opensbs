using System;
using System.Collections.Generic;
using System.Numerics;
using System.Threading;
using System.Threading.Tasks;
using OpenSBS.Engine.Commands;

namespace OpenSBS.Engine
{
    public class Game
    {
        private static readonly Lazy<Game> _instance = new Lazy<Game>(() => new Game());
        private Timer _timer;
        private DateTime _lastTick;
        private List<IUpdatable> _entityList= new List<IUpdatable>();

        public static Game Instance => _instance.Value;
        public event EventHandler<string> StateRefreshEventHandler;

        public Game()
        {
            // TODO : init game, build something?
            
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
        }

        private void OnTick(object state)
        {
            var now = DateTime.Now;
            _lastTick = now;
            foreach (var entity in _entityList)
            {
                entity.Update();
            }
            // TODO : invoke handler?
            //StateRefreshEventHandler?.Invoke(this, _myShip.State);
        }
    }
}
