using System;
using OpenSBS.Engine.Data.Spaceships;
using OpenSBS.Engine.Missions;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Data.Missions
{
    [Mission("Another Test Mission", Description = "Just another test mission, not spiffy at all.")]
    public class AnotherMission : Mission
    {
        public AnotherMission(Game game) : base(game)
        {
            var ship = new ViperInterceptorSpaceship("PLAYER_SHIP", "Archimedes", "ARC-927");
            Game.AddBrain(new Brain(ship));

            var dummyTarget1 = new DummyTargetSpaceship("DUMMY_A", "Dummy A", "DT-A");
            dummyTarget1.MoveTo(1000, 1000, 0);
            Game.AddEntity(dummyTarget1);

            var dummyTarget2 = new DummyTargetSpaceship("DUMMY_B", "Dummy B", "DT-B");
            dummyTarget2.MoveTo(-2000, -2000, 0);
            Game.AddEntity(dummyTarget2);
        }

        public override void Update(TimeSpan deltaT) { }
    }
}
