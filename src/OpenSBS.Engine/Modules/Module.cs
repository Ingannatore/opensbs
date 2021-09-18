using System;
using OpenSBS.Engine.Models;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Modules
{
    public abstract class Module
    {
        public string Id { get; }
        public string Type { get; }
        public string Name { get; }
        public int Mass { get; protected set; }
        public int Size { get; protected set; }

        protected Module(string id, string type, string name)
        {
            Id = id;
            Type = type;
            Name = name;
        }

        public abstract void HandleAction(ClientAction action);
        public abstract void Update(TimeSpan deltaT, Entity owner, World world);
    }
}
