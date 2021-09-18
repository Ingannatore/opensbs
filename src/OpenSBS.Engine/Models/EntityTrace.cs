using System;
using System.Numerics;
using OpenSBS.Engine.Utils;

namespace OpenSBS.Engine.Models
{
    public class EntityTrace
    {
        public string Id { get; }
        public string Type { get; }
        public string CallSign { get; }
        public Vector3 Position { get; protected set; }
        public int Distance { get; protected set; }
        public Vector3 RelativePosition { get; protected set; }
        public Vector3 RelativeDirection { get; protected set; }

        public static EntityTrace ForEntity(Entity entity)
        {
            return new EntityTrace(entity.Id, entity.Type, entity.CallSign);
        }

        public EntityTrace(string id, string type, string callSign)
        {
            Id = id;
            Type = type;
            CallSign = callSign;
            Distance = 0;
        }

        public void Update(Entity owner, Entity target)
        {
            Position = target.Position;
            Distance = (int)Math.Round(Vector3.Distance(owner.Position, target.Position));
            RelativePosition = target.Position - owner.Position;
            RelativeDirection = Vectors.Rotate(
                Vector3.Normalize(RelativePosition),
                Angles.ToRadians(90),
                0,
                0
            );
        }
    }
}
