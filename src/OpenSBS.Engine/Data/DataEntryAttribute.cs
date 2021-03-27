using System;

namespace OpenSBS.Engine.Data
{
    [AttributeUsage(AttributeTargets.Class)]
    public class DataEntryAttribute : Attribute
    {
        public DataEntryCategory Category { get; }
        public string Name { get; }
        public string Description { get; set; }

        public DataEntryAttribute(DataEntryCategory category, string name)
        {
            Category = category;
            Name = name;
        }
    }
}
