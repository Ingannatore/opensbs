﻿using System;
using OpenSBS.Data.Ships;
using OpenSBS.Engine;
using OpenSBS.Engine.Attributes;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Data.Scenarios
{
    [Scenario("Another Test Scenario", Description = "Just another test scenario, not spiffy at all.")]
    public class AnotherScenario : Scenario
    {
        public override void Initialize()
        {
            var ship = new Ship("PLAYER_SHIP", "Archimedes");
            Game.Instance.AddBrain(new Brain(ship));

            var dummyTarget1 = new DummyTarget("DUMMY_A", "Dummy A");
            dummyTarget1.SetPosition(1000, 1000, 0);
            Game.Instance.AddEntity(dummyTarget1);

            var dummyTarget2 = new DummyTarget("DUMMY_B", "Dummy B");
            dummyTarget2.SetPosition(-2000, -2000, 0);
            Game.Instance.AddEntity(dummyTarget2);
        }

        public override void Update(TimeSpan timeSpan) { }
    }
}
