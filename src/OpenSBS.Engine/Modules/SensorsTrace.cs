using System;
using System.Numerics;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Modules
{
    public class SensorsTrace
    {
        public string Id { get; }
        public string Type { get; }
        public string CallSign { get; }
        public Vector3 Position { get; protected set; }
        public int Distance { get; protected set; }

        public static SensorsTrace ForEntity(Entity entity)
        {
            return new SensorsTrace(entity.Id, entity.Type, entity.CallSign);
        }

        public SensorsTrace(string id, string type, string callSign)
        {
            Id = id;
            Type = type;
            CallSign = callSign;
            Distance = 0;
        }

        public void Update(Entity owner, Entity target)
        {
            Position = target.Position;
            Distance = (int) Math.Round(Vector3.Distance(owner.Position, target.Position));
        }
    }
}
