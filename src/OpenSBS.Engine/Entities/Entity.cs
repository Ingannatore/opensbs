using System;
using System.Numerics;

namespace OpenSBS.Engine.Entities
{
    public abstract class Entity : IUpdatable
    {
        public string Id { get; }
        public string Name { get; }
        public string Type { get; }
        public Vector3 Position { get; set; }
        public Vector3 Rotation { get; set; }
        public float Mass { get; set; }
        public float Size { get; set; }

        protected Entity(string id, string name, string type)
        {
            Id = id;
            Name = name;
            Type = type;
        }

        public abstract string State();
        public abstract void Update(TimeSpan timeSpan);
    }
}
