using System;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Models
{
    public abstract class Mission
    {
        public Entity Spaceship { get; }
        public World World { get; }

        protected Mission(Entity spaceship)
        {
            Spaceship = spaceship;
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
