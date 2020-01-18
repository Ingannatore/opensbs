using System;
using System.Reflection;
using Newtonsoft.Json;
using OpenSBS.Engine.Attributes;

namespace OpenSBS.Engine.Entities
{
    public class ScenarioInfo
    {
        [JsonIgnore]
        public Type Type { get; }
        public Guid Guid { get; }
        public string Title { get; }
        public string Description { get; }

        public ScenarioInfo(Type type)
        {
            var scenarioAttribute = GetScenarioAttribute(type);

            Type = type;
            Guid = type.GUID;
            Title = scenarioAttribute.Title;
            Description = scenarioAttribute.Description;
        }

        private static ScenarioAttribute GetScenarioAttribute(MemberInfo type)
        {
            return (ScenarioAttribute) Attribute.GetCustomAttribute(type, typeof (ScenarioAttribute));
        }
    }
}
