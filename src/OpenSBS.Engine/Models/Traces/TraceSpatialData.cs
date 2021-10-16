using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Utils;

namespace OpenSBS.Engine.Models.Traces
{
    public class TraceSpatialData
    {
        public Vector3 Position { get; protected set; }
        public double Bearing { get; protected set; }
        public int Distance { get; protected set; }
        public int Speed { get; protected set; }
        public Vector3 RelativePosition { get; protected set; }
        public double RelativeBearing { get; protected set; }
        public string RelativeSide { get; protected set; }

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
