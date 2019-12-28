using System.Collections.Generic;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Server
{
    public class RefreshStateMessage
    {
        public Entity Ship { get; }
        public IEnumerable<Entity> Entities { get; }
        public ServerProperties Properties { get; }

        public RefreshStateMessage(
            Entity ship,
            IEnumerable<Entity> entities,
            ServerProperties properties = null
        )
        {
            Ship = ship;
            Entities = entities;
            Properties = properties;
        }
    }

    public class ServerProperties
    {
        public bool isReady { get; }
        public bool isRunning { get; }

        public ServerProperties(bool isReady, bool isRunning)
        {
            this.isReady = isReady;
            this.isRunning = isRunning;
        }

    }
}
