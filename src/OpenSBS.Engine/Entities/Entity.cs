using System;
using System.Numerics;

namespace OpenSBS.Engine.Entities
{
    public abstract class Entity : IUpdatable
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public Vector3 Position { get; set; }
        public Vector3 Rotation { get; set; }
        public float Mass { get; set; }
        public float Size { get; set; }

        public abstract string State();
        public abstract void Update(TimeSpan timeSpan);
    }
}
