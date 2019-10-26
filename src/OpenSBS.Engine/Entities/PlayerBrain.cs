using System;

namespace OpenSBS.Engine.Entities
{
    public class PlayerBrain : Brain
    {
        public PlayerBrain() : base(new Ship(100))
        {
            Entity.Id = "PLAYER_SHIP";
            Entity.Name = "Player Ship";
            Entity.Type = "Player Ship";
        }

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
