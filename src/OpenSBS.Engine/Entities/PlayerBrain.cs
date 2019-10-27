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
                while (!Commands.Empty)
                {
                    playerShip.HandleCommand(Commands.Dequeue());
                }
            }

            base.Update(timeSpan);
        }
    }
}
