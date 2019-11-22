using System;

namespace OpenSBS.Engine.Entities
{
    public interface IUpdatable
    {
        void Update(TimeSpan timeSpan);
    }
}
