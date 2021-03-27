using OpenSBS.Engine.Data.Spaceships;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Data.Missions
{
    [DataEntry(
        DataEntryCategory.Mission,
        "Another Test Mission",
        Description = "Just another test mission, not spiffy at all."
    )]
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
            dummyTarget1.MoveTo(1000, 0, 1000);
            World.AddEntity(dummyTarget1);

            var dummyTarget2 = new DummyTarget("DUMMY_B", "Dummy B", "DT-B");
            dummyTarget2.MoveTo(-2000, 0, -2000);
            World.AddEntity(dummyTarget2);
        }
    }
}
