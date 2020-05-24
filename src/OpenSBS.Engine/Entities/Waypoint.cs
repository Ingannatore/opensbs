using System;
using System.Numerics;

namespace OpenSBS.Engine.Entities
{
    public class Waypoint
    {
        public int Id { get; }
        public Vector3 Position { get; }
        public int Distance { get; set; }
        public int Direction { get; set; }

        public Waypoint(int id, Vector3 position)
        {
            Id = id;
            Position = position;
        }

        public Waypoint UpdateDistance(Vector3 ownerPosition)
        {
            Distance = (int) Math.Round(Vector3.Distance(Position, ownerPosition));
            return this;
        }

        public Waypoint UpdateDirection(Vector3 ownerPosition)
        {
            var vectorToWaypoint = Vector3.Normalize(Vector3.Subtract(Position, ownerPosition));
            Direction = (int) (Math.Atan2(vectorToWaypoint.Y, vectorToWaypoint.X) * (180 / Math.PI));

            return this;
        }
    }
}
