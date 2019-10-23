using System;

namespace OpenSBS.Engine.Entities
{
    public class PlayerBrain : Brain
    {
        public PlayerBrain() : base(new Ship(100))
        {
            _entity.Id = "PLAYER_SHIP";
            _entity.Name = "Player Ship";
            _entity.Type = "Player Ship";
        }

        public override void Update(TimeSpan timeSpan)
        {
            if (_entity is Ship playerShip)
            {
                while (!_commands.Empty)
                {
                    playerShip.HandleCommand(_commands.Dequeue());
                }
            }

            base.Update(timeSpan);
        }
    }
}
