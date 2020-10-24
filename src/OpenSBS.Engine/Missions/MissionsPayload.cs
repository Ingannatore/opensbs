using System.Collections.Generic;

namespace OpenSBS.Engine.Missions
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
