using System;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Engine
{
    public class MyScenario : Scenario
    {
        public override void Initialize()
        {
            var ship = new Ship("PLAYER_SHIP", "Archimedes");
            ship.SetRotation(0, 23, 0);

            Game.Instance.AddBrain(new Brain(ship));
        }

        public override void Update(TimeSpan timeSpan) { }
    }
}
