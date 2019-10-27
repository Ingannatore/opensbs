using System;
using System.Threading;

namespace OpenSBS.Engine
{
    public class GameClock
    {
        private static readonly Lazy<GameClock> SingletonInstance = new Lazy<GameClock>(() => new GameClock());
        private Timer _timer;
        private DateTime _lastTick;

        public static GameClock Instance => SingletonInstance.Value;
        public event EventHandler<TimeSpan> TickEventHandler;

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

        public void RegisterTickEventHandler(EventHandler<TimeSpan> onTick)
        {
            TickEventHandler -= onTick;
            TickEventHandler += onTick;
        }

        private void OnTick(object state)
        {
            var now = DateTime.Now;
            TickEventHandler?.Invoke(this, now - _lastTick);

            _lastTick = now;
        }
    }
}
