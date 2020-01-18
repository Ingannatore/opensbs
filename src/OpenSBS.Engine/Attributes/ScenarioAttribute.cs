using System;

namespace OpenSBS.Engine.Attributes
{
    [AttributeUsage(AttributeTargets.Class)]
    public class ScenarioAttribute : Attribute
    {
        public string Title { get; }
        public string Description { get; set; }

        public ScenarioAttribute(string title)
        {
            Title = title;
        }
    }
}
