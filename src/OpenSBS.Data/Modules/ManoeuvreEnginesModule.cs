using System;
using OpenSBS.Engine.Entities;
using OpenSBS.Engine.Exceptions;
using OpenSBS.Engine.Messages;

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

        public override void HandleMessage(Message message)
        {
            switch (message.Command)
            {
                case "set":
                    Rudder = message.Payload.ToObject<int>();
                    break;
                case "add":
                    Rudder += message.Payload.ToObject<int>();
                    break;
                default:
                    throw new UnknownModuleCommandException(this, message);
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
