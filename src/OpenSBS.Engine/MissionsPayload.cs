using System.Collections.Generic;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Engine
{
    public class MissionsPayload
    {
        public IEnumerable<MissionInfo> Missions { get; }

        public MissionsPayload(IEnumerable<MissionInfo> missions)
        {
            Missions = missions;
        }
    }
}
