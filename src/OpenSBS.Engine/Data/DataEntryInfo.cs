using System;
using System.Reflection;
using Newtonsoft.Json;

namespace OpenSBS.Engine.Data
{
    public class DataEntryInfo
    {
        [JsonIgnore]
        public Type Type { get; }
        [JsonIgnore]
        public DataEntryCategory Category { get; }
        public Guid Guid { get; }
        public string Name { get; }
        public string Description { get; }

        public DataEntryInfo(Type type)
        {
            var attribute = GetAttribute(type);

            Type = type;
            Category = attribute.Category;
            Guid = type.GUID;
            Name = attribute.Name;
            Description = attribute.Description;
        }

        private static DataEntryAttribute GetAttribute(MemberInfo type)
        {
            return (DataEntryAttribute) Attribute.GetCustomAttribute(type, typeof (DataEntryAttribute));
        }
    }
}
