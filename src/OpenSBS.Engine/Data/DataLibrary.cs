using System;
using System.Collections.Generic;
using System.Linq;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Data
{
    public class DataLibrary
    {
        public IEnumerable<DataEntryInfo> AvailableMissions => _missions.Values.ToList();
        public IEnumerable<DataEntryInfo> AvailableSpaceships => _spaceships.Values.ToList();

        private readonly IDictionary<string, DataEntryInfo> _missions;
        private readonly IDictionary<string, DataEntryInfo> _spaceships;

        public DataLibrary()
        {
            _missions = new Dictionary<string, DataEntryInfo>();
            _spaceships = new Dictionary<string, DataEntryInfo>();

            foreach (var dataType in GetDataTypes())
            {
                var info = new DataEntryInfo(dataType);
                switch (info.Category)
                {
                    case DataEntryCategory.Mission:
                        _missions.Add(info.Guid.ToString(), info);
                        break;
                    case DataEntryCategory.Spaceship:
                        _spaceships.Add(info.Guid.ToString(), info);
                        break;
                    default:
                        throw new Exception($"Unknown data entry category: {info.Category}");
                }
            }
        }

        private static IEnumerable<Type> GetDataTypes()
        {
            return typeof(DataLibrary).Assembly
                .GetTypes()
                .Where(t => t.IsDefined(typeof(DataEntryAttribute), false));
        }

        public Mission CreateMission(string mission, string spaceship, string name, string callsign)
        {
            if (!_missions.ContainsKey(mission))
            {
                throw new Exception($"Unknown mission ID: {mission}");
            }

            return (Mission) Activator.CreateInstance(
                _missions[mission].Type,
                CreateSpaceship(spaceship, name, callsign)
            );
        }

        private Entity CreateSpaceship(string id, string name, string callsign)
        {
            if (!_spaceships.ContainsKey(id))
            {
                throw new Exception($"Unknown spaceship ID: {id}");
            }

            return (Entity) Activator.CreateInstance(
                _spaceships[id].Type,
                Guid.NewGuid().ToString("N"),
                name,
                callsign
            );
        }
    }
}
