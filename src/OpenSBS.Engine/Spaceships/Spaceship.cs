using System;
using OpenSBS.Engine.Commands;
using OpenSBS.Engine.Models;
using OpenSBS.Engine.Spaceships.Modules;

namespace OpenSBS.Engine.Spaceships
{
    public abstract class Spaceship : SpaceThing
    {
        public string CallSign { get;}
        public ModulesCollection Modules { get; }

        protected Spaceship(string id, string name, string callSign) : base(id, name)
        {
            CallSign = callSign;
            Modules = new ModulesCollection();
        }

        public void HandleCommand(GameCommand command)
        {
            if (!string.IsNullOrEmpty(command.Meta.Module))
            {
                Modules.Get(command.Meta.Module).HandleCommand(command);
            }
        }

        public override void Update(TimeSpan deltaT)
        {
            Modules.Update(deltaT, this);
            base.Update(deltaT);
        }
    }
}
