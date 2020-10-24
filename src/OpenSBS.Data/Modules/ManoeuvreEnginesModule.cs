using System;
using OpenSBS.Core.Commands;
using OpenSBS.Engine.Entities;
using OpenSBS.Engine.Exceptions;

namespace OpenSBS.Data.Modules
{
    public class ManoeuvreEnginesModule : Module
    {
        private const float RotationSpeed = 1;
        public int Rudder { get; protected set; }

        public ManoeuvreEnginesModule(string id) : base(id, "engine.manoeuvre")
        {
            Rudder = 0;
        }

        public override void HandleMessage(GameCommand command)
        {
            switch (command.Name)
            {
                case "set":
                    Rudder = command.GetPayload<int>();
                    break;
                case "add":
                    Rudder += command.GetPayload<int>();
                    break;
                default:
                    throw new UnknownModuleCommandException(this, command);
            }
        }

        public override void Update(TimeSpan timeSpan)
        {
            if (Rudder == 0)
            {
                return;
            }

            var deltaRotation = (float)Math.Round(Math.Sign(Rudder) * RotationSpeed * timeSpan.TotalSeconds, 2);
            var rotationY = Owner.Rotation.Y + deltaRotation;
            if (rotationY < 0)
            {
                rotationY += 360;
            }

            if (rotationY >= 360)
            {
                rotationY -= 360;
            }

            Owner.SetRotation(Owner.Rotation.X, rotationY, Owner.Rotation.Z);
        }
    }
}
