using System;

namespace OpenSBS.Engine.Entities
{
    public class PlayerBrain : Brain
    {
        public PlayerBrain(Entity entity) : base(entity) { }

        public override void Update(TimeSpan timeSpan)
        {
            if (Entity is Ship playerShip)
            {
                while (!Message.Empty)
                {
                    playerShip.HandleMessage(Message.Dequeue());
                }
            }

            base.Update(timeSpan);
        }
    }
}
