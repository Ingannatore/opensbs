using System;
using System.Reflection;
using Newtonsoft.Json;
using OpenSBS.Engine.Attributes;

namespace OpenSBS.Engine.Entities
{
    public class MissionInfo
    {
        [JsonIgnore]
        public Type Type { get; }
        public Guid Guid { get; }
        public string Title { get; }
        public string Description { get; }

        public MissionInfo(Type type)
        {
            var missionAttribute = GetMissionAttribute(type);

            Type = type;
            Guid = type.GUID;
            Title = missionAttribute.Title;
            Description = missionAttribute.Description;
        }

        private static MissionAttribute GetMissionAttribute(MemberInfo type)
        {
            return (MissionAttribute) Attribute.GetCustomAttribute(type, typeof (MissionAttribute));
        }
    }
}
