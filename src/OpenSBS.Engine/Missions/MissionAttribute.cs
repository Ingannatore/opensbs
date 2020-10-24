using System;

namespace OpenSBS.Engine.Missions
{
    [AttributeUsage(AttributeTargets.Class)]
    public class MissionAttribute : Attribute
    {
        public string Title { get; }
        public string Description { get; set; }

        public MissionAttribute(string title)
        {
            Title = title;
        }
    }
}
