using System;
using System.Collections.Generic;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine
{
    public class World
    {
        private readonly ICollection<SpaceThing> _things;

        public World()
        {
            _things = new List<SpaceThing>();
        }

        public void Add(SpaceThing thing)
        {
            if (!_things.Contains(thing))
            {
                _things.Add(thing);
            }
        }

        public void Update(TimeSpan deltaT)
        {
            foreach (var thing in _things)
            {
                thing.Update(deltaT);
            }
        }
    }
}
