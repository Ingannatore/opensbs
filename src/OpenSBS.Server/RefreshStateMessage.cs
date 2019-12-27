using System.Collections.Generic;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Server
{
    public class RefreshStateMessage
    {
        public Entity Ship { get; }
        public IEnumerable<Entity> Entities { get; }
        public string Properties { get; }

        public RefreshStateMessage(
            Entity ship,
            IEnumerable<Entity> entities,
            string properties
        )
        {
            Ship = ship;
            Entities = entities;
            Properties = properties;
        }
    }
}
