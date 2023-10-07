﻿namespace OpenSBS.Core.Models
{
    internal class EntityTrace
    {
        public string Id { get; }
        public int Bearing { get; protected set; }
        public int Distance { get; protected set; }

        public EntityTrace(string id)
        {
            Id = id;
        }

        public void Update(int bearing, int distance)
        {
            Bearing = bearing;
            Distance = distance;
        }
    }
}
