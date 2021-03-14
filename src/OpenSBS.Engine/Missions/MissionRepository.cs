using System;
using System.Collections.Generic;
using System.Linq;

namespace OpenSBS.Engine.Missions
{
    public class MissionRepository
    {
        public IEnumerable<MissionInfo> AvailableMissions => _missions.Values.ToList();

        private readonly IDictionary<string, MissionInfo> _missions;

        public MissionRepository()
        {
            _missions = new Dictionary<string, MissionInfo>();

            foreach (var missionType in GetMissionsTypes())
            {
                var info = new MissionInfo(missionType);
                _missions.Add(info.Guid.ToString(), info);
            }
        }

        public Mission CreateInstance(string id)
        {
            if (!_missions.ContainsKey(id))
            {
                throw new UnknownMissionException(id);
            }

            return (Mission) Activator.CreateInstance(_missions[id].Type);
        }

        private IEnumerable<Type> GetMissionsTypes()
        {
            return typeof(MissionRepository).Assembly
                .GetTypes()
                .Where(t => t.IsDefined(typeof(MissionAttribute), false));
        }
    }
}
