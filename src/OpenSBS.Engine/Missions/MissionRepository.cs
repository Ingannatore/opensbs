using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace OpenSBS.Engine.Missions
{
    public class MissionRepository
    {
        private readonly Assembly _assembly;
        private readonly IDictionary<string, MissionInfo> _missions;
        public IEnumerable<MissionInfo> AvailableMissions => _missions.Values.ToList();

        public MissionRepository()
        {
            _assembly = typeof(MissionRepository).Assembly;
            _missions = new Dictionary<string, MissionInfo>();
            foreach (var missionType in GetMissions())
            {
                var info = new MissionInfo(missionType);
                _missions.Add(info.Guid.ToString(), info);
            }
        }

        public Type GetMissionType(string id)
        {
            if (!_missions.ContainsKey(id))
            {
                throw new UnknownMissionException(id);
            }

            return _missions[id].Type;
        }

        private IEnumerable<Type> GetMissions()
        {
            return _assembly
                .GetTypes()
                .Where(t => t.IsDefined(typeof(MissionAttribute), false));
        }
    }
}
