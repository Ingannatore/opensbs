using System.Collections.Generic;
using OpenSBS.Engine.Missions;

namespace OpenSBS.Engine.Models
{
    public class ServerState
    {
        public bool IsReady { get; protected set; }
        public bool IsRunning { get; protected set; }
        public long LastTick { get; protected set; }
        public int LastDeltaT { get; protected set; }
        public IEnumerable<MissionInfo> Missions { get; }

        public ServerState(IEnumerable<MissionInfo> missions)
        {
            IsReady = false;
            IsRunning = false;
            LastTick = 0;
            LastDeltaT = 0;
            Missions = missions;
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
