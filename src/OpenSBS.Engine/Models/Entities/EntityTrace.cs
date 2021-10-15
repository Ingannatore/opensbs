using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using OpenSBS.Engine.Utils;

namespace OpenSBS.Engine.Models.Entities
{
    public class EntityTrace
    {
        public string Id { get; }
        public string Type { get; }
        public string CallSign { get; }
        public Vector3 Position { get; protected set; }
        public double Bearing { get; protected set; }
        public int Distance { get; protected set; }
        public int Speed { get; protected set; }
        public Vector3 RelativePosition { get; protected set; }
        public double RelativeBearing { get; protected set; }
        public string RelativeSide { get; protected set; }

        public static EntityTrace ForEntity(Entity entity)
        {
            return new EntityTrace(entity.Id, entity.Type, entity.CallSign);
        }

        private EntityTrace(string id, string type, string callSign)
        {
            Id = id;
            Type = type;
            CallSign = callSign;
            Distance = 0;
            Bearing = 0;
        }

        public bool IsOutOfRange(int range)
        {
            return Distance > range;
        }

        public bool IsOutOfFiringArc(IEnumerable<string> firingArcs)
        {
            return !firingArcs.Contains(RelativeSide);
        }

        public void Update(Entity owner, Entity target)
        {
            Position = target.Position;
            Bearing = target.Bearing;
            Distance = (int)Math.Round(Vector3.Distance(owner.Position, target.Position));
            Speed = (int)Math.Round(target.LinearSpeed);
            RelativePosition = target.Position - owner.Position;

            var relativeDirection = Vector3.Normalize(RelativePosition);
            RelativeBearing = Angles.GetBearing(relativeDirection);
            RelativeSide = Angles.ToEntitySide(owner.Direction, relativeDirection);
        }
    }
}
