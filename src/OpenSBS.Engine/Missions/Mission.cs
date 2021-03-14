using System;

namespace OpenSBS.Engine.Missions
{
    public abstract class Mission
    {
        public abstract void Init(World world);
        public abstract void Update(World world, TimeSpan deltaT);
    }
}
