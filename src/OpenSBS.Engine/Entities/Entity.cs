using System;
using System.Numerics;

namespace OpenSBS.Engine.Entities
{
    public abstract class Entity : IUpdatable
    {
        public string Id { get; }
        public string Name { get; }
        public string Type { get; }
        public Vector3 Position { get; protected set; }
        public Vector3 Rotation { get; protected set; }
        public float Mass { get; protected set; }
        public float Size { get; protected set; }

        protected Entity(string id, string name, string type)
        {
            Id = id;
            Name = name;
            Type = type;
            Rotation = new Vector3(0, 0, 0);
        }

        public Entity SetPosition(float x, float y, float z)
        {
            Position = new Vector3(x, y, z);
            return this;
        }

        public Entity SetRotation(float x, float y, float z)
        {
            Rotation = new Vector3(x, y, z);
            return this;
        }

        public Entity SetMass(float value)
        {
            Mass = value;
            return this;
        }

        public Entity SetSize(float value)
        {
            Size = value;
            return this;
        }

        public abstract string State();
        public abstract void Update(TimeSpan timeSpan);
    }
}
