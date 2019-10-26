using System;

namespace OpenSBS.Engine.Entities
{
    public interface IUpdatable
    {
        string State();
        void Update(TimeSpan timeSpan);
    }
}
