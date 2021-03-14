using System;
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

        public void HandleAction(GameAction action)
        {
            if (!string.IsNullOrEmpty(action.Meta.Module))
            {
                Modules.Get(action.Meta.Module).HandleAction(action);
            }
        }

        public override void Update(TimeSpan deltaT)
        {
            Modules.Update(deltaT, this);
            base.Update(deltaT);
        }
    }
}
