using System;
using System.Collections.Generic;
using OpenSBS.Engine.Models;
using OpenSBS.Engine.Spaceships;

namespace OpenSBS.Engine.Missions
{
    public abstract class Mission
    {
        public Spaceship Spaceship { get; protected set; }
        public ICollection<SpaceThing> World { get; }

        protected Mission()
        {
            World = new List<SpaceThing>();
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
