using System.Collections.Generic;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Models
{
    public class WorldState
    {
        public Entity Ship { get; }
        public IEnumerable<Entity> Entities { get; }

        public WorldState(Entity ship, IEnumerable<Entity> entities)
        {
            Ship = ship;
            Entities = entities;
        }
    }
}
