﻿using System;
using System.Threading;

namespace OpenSBS.Engine
{
    public class ServerClock : IServerClock, IDisposable
    {
        public bool IsRunning { get; private set; }
        public DateTime LastTick { get; private set; }
        public TimeSpan LastDeltaT { get; private set; }

        private event EventHandler<TimeSpan> TickEventHandler;
        private readonly int _period;
        private readonly Timer _timer;

        public ServerClock(int expectedTicksPerSecond = 20)
        {
            LastTick = DateTime.MinValue;
            LastDeltaT = TimeSpan.Zero;

            _period = (int) Math.Round(1000.0 / expectedTicksPerSecond);
            _timer = new Timer(OnTick, null, Timeout.Infinite, Timeout.Infinite);
        }

        public void Start()
        {
            LastTick = DateTime.Now;
            _timer.Change(0, _period);
            IsRunning = true;
        }

        public void Stop()
        {
            _timer.Change(Timeout.Infinite, Timeout.Infinite);
            IsRunning = false;
        }

        public void RegisterOnTickEventHandler(EventHandler<TimeSpan> handler)
        {
            TickEventHandler -= handler;
            TickEventHandler += handler;
        }

        public void Dispose()
        {
            _timer.Dispose();
        }

        private void OnTick(object state)
        {
            var now = DateTime.Now;
            LastDeltaT = now - LastTick;
            LastTick = now;

            TickEventHandler?.Invoke(this, LastDeltaT);
        }
    }
}
