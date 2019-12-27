using System.Collections.Generic;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Server
{
    public class RefreshStateMessage
    {
        public Entity PlayerShip { get; }
        public IEnumerable<Entity> WorldEntities { get; }
        public string ServerProperties { get; }

        public RefreshStateMessage(Entity playerShip, IEnumerable<Entity> worldEntities,
            string serverProperties)
        {
            PlayerShip = playerShip;
            WorldEntities = worldEntities;
            ServerProperties = serverProperties;
        }
    }

}
