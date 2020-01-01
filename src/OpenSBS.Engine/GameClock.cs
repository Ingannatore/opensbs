using System;
using System.Threading;

namespace OpenSBS.Engine
{
    public class GameClock : Singleton<GameClock>
    {
        private const int ExpectedFps = 1;
        private Timer _timer;
        private DateTime _lastTick;

        public bool IsRunning { get; private set; }
        public event EventHandler<TimeSpan> TickEventHandler;

        public void Start()
        {
            _lastTick = DateTime.Now;
            _timer = new Timer(
                OnTick,
                null,
                TimeSpan.Zero,
                TimeSpan.FromMilliseconds(Math.Round(1000.0 / ExpectedFps))
            );
            IsRunning = true;
        }

        public void Stop()
        {
            _timer?.Change(Timeout.Infinite, 0);
            IsRunning = false;
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
