using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using OpenSBS.Engine;
using OpenSBS.Engine.Attributes;
using OpenSBS.Engine.Entities;
using OpenSBS.Engine.Exceptions;

namespace OpenSBS.Data
{
    public class MissionsLibrary : Singleton<MissionsLibrary>
    {
        private readonly Assembly _assembly;
        private readonly IDictionary<string, MissionInfo> _missions;
        public IEnumerable<MissionInfo> AvailableMissions => _missions.Values.ToList();

        public MissionsLibrary()
        {
            _assembly = typeof(MissionsLibrary).Assembly;
            _missions = new Dictionary<string, MissionInfo>();
        }

        public void LoadMissions()
        {
            _missions.Clear();

            foreach (var missionType in GetMissions())
            {
                var info = new MissionInfo(missionType);
                _missions.Add(info.Guid.ToString(), info);
            }
        }

        public Mission InstantiateMission(string id)
        {
            if (!_missions.ContainsKey(id))
            {
                throw new UnknownMissionException(id);
            }

            return (Mission) Activator.CreateInstance(_missions[id].Type);
        }

        private IEnumerable<Type> GetMissions()
        {
            return _assembly
                .GetTypes()
                .Where(t => t.IsDefined(typeof(MissionAttribute), false));
        }
    }
}
