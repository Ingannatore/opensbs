using System;

namespace OpenSBS.Engine.Entities
{
    public abstract class Scenario
    {
        public abstract void Initialize();
        public abstract void Update(TimeSpan timeSpan);
    }
}
