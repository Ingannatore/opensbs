using System.Numerics;

namespace OpenSBS.Core.Models
{
    internal class Waypoint
    {
        public Vector2 Position { get; }
        public int Bearing { get; protected set; }
        public float Distance { get; protected set; }

        public Waypoint(Vector2 position)
        {
            Position = position;
        }

        public void Update(int bearing, float distance)
        {
            Bearing = bearing;
            Distance = distance;
        }
    }
}
