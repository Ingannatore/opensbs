using System;
using System.Collections.Generic;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Missions
{
    public abstract class Mission
    {
        public Entity Spaceship { get; protected set; }
        public ICollection<Entity> World { get; }

        protected Mission()
        {
            World = new List<Entity>();
        }

        public abstract void Init();

        public virtual void Update(TimeSpan deltaT)
        {
            Spaceship.Update(deltaT);
            foreach (var thing in World)
            {
                thing.Update(deltaT);
            }
        }
    }
}
