using System;
using OpenSBS.Engine.Commands;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Engine.Spaceships.Modules
{
    public abstract class Module : Thing
    {
        protected Module(string id, string name) : base(id, name) { }

        public abstract void HandleCommand(GameCommand command);
        public abstract void Update(TimeSpan deltaT, Spaceship owner);
    }
}
