using System;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Engine
{
    public class MyScenario : Scenario
    {
        public override void Initialize()
        {
            Game.Instance.AddBrain(new PlayerBrain(new Ship("PLAYER_SHIP", "Player Ship")));
        }

        public override void Update(TimeSpan timeSpan) { }
    }
}
