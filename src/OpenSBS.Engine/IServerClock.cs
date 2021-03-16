using System;

namespace OpenSBS.Engine
{
    public interface IServerClock
    {
        bool IsRunning { get; }
        DateTime LastTick { get; }
        TimeSpan LastDeltaT { get; }
        void Start();
        void Stop();
        void RegisterOnTickEventHandler(EventHandler<TimeSpan> handler);
    }
}
