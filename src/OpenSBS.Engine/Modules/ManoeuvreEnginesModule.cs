using System;
using OpenSBS.Engine.Entities;
using OpenSBS.Engine.Messages;

namespace OpenSBS.Engine.Modules
{
    public class ManoeuvreEnginesModule : Module
    {
        public int Rudder { get; protected set; }

        public ManoeuvreEnginesModule(string id) : base(id, "engine.manoeuvre")
        {
            Rudder = 0;
        }

        public override void HandleMessage(Message message)
        {
            Rudder = message.Payload.ToObject<int>();
        }

        public override void Update(TimeSpan timeSpan)
        {
            if (Rudder == 0)
            {
                return;
            }

            var rotationY = Owner.Rotation.Y + Math.Sign(Rudder);
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
