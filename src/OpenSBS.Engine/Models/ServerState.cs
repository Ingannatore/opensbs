using System.Collections.Generic;
using OpenSBS.Engine.Data;

namespace OpenSBS.Engine.Models
{
    public class ServerState
    {
        public bool IsReady { get; protected set; }
        public bool IsRunning { get; protected set; }
        public long LastTick { get; protected set; }
        public int LastDeltaT { get; protected set; }
        public IEnumerable<DataEntryInfo> Missions { get; }
        public IEnumerable<DataEntryInfo> Spaceships { get; }

        public ServerState(IEnumerable<DataEntryInfo> missions, IEnumerable<DataEntryInfo> spaceships)
        {
            IsReady = false;
            IsRunning = false;
            LastTick = 0;
            LastDeltaT = 0;
            Missions = missions;
            Spaceships = spaceships;
        }

        public void Update(bool isReady, bool isRunning, long lastTick, int lastDeltaT)
        {
            IsReady = isReady;
            IsRunning = isRunning;
            LastTick = lastTick;
            LastDeltaT = lastDeltaT;
        }
    }
}
