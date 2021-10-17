using OpenSBS.Engine.Data.Spaceships;
using OpenSBS.Engine.Models;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Data.Missions
{
    [DataEntry(
        DataEntryCategory.Mission,
        "Another Test Mission",
        Description = "Just another test mission, not spiffy at all."
    )]
    public class AnotherMission : Mission
    {
        public AnotherMission(Entity spaceship) : base(spaceship) { }

        public override void Init()
        {
            var dummyTarget1 = new FloatingContainer("DUMMY_A", "Dummy A", "DMY-00A");
            dummyTarget1.MoveTo(1000, 0, 1000);
            World.AddEntity(dummyTarget1);

            var dummyTarget2 = new FloatingContainer("DUMMY_B", "Dummy B", "DMY-00B");
            dummyTarget2.MoveTo(-2000, 0, -2000);
            World.AddEntity(dummyTarget2);
        }
    }
}
