using OpenSBS.Engine.Data.Spaceships;
using OpenSBS.Engine.Missions;

namespace OpenSBS.Engine.Data.Missions
{
    [Mission("Another Test Mission", Description = "Just another test mission, not spiffy at all.")]
    public class AnotherMission : Mission
    {
        public override void Init()
        {
            Spaceship = new ViperInterceptor(
                "PLAYER_SHIP",
                "Archimedes",
                "ARC-927"
            );

            var dummyTarget1 = new DummyTarget("DUMMY_A", "Dummy A", "DT-A");
            dummyTarget1.MoveTo(1000, 1000, 0);
            World.AddEntity(dummyTarget1);

            var dummyTarget2 = new DummyTarget("DUMMY_B", "Dummy B", "DT-B");
            dummyTarget2.MoveTo(-2000, -2000, 0);
            World.AddEntity(dummyTarget2);
        }
    }
}
