using System;

namespace OpenSBS.Engine.Entities
{
    public abstract class Mission
    {
        public abstract void Initialize();
        public abstract void Update(TimeSpan timeSpan);
    }
}
