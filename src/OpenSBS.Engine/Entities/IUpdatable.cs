using System;

namespace OpenSBS.Engine.Entities
{
    public interface IUpdatable
    {
        string State { get; }

        void Update(TimeSpan timeSpan);
    }
}
