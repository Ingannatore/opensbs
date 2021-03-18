using System;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Missions
{
    public abstract class Mission
    {
        public Entity Spaceship { get; protected set; }
        public World World { get; }

        protected Mission()
        {
            World = new World();
        }

        public abstract void Init();

        public virtual void Update(TimeSpan deltaT)
        {
            Spaceship.Update(deltaT, World);
            World.Update(deltaT);
        }
    }
}
