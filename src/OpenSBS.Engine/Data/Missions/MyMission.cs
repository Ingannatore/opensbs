using OpenSBS.Engine.Data.Spaceships;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Data.Missions
{
    [DataEntry(
        DataEntryCategory.Mission,
        "My Test Mission",
        Description = "Just a simple test mission, nothing fancy."
    )]
    public class MyMission : Mission
    {
        public MyMission(Entity spaceship) : base(spaceship) { }

        public override void Init()
        {
            var dummyTarget1 = new DummyTarget("DUMMY_1", "Dummy 1", "DMY-001");
            dummyTarget1.MoveTo(2000, 0, 0);
            World.AddEntity(dummyTarget1);

            var dummyTarget2 = new DummyTarget("DUMMY_2", "Dummy 2", "DMY-002");
            dummyTarget2.MoveTo(500, 0, -3000);
            World.AddEntity(dummyTarget2);

            var dummyTarget3 = new DummyTarget("DUMMY_3", "Dummy 3", "DMY-003");
            dummyTarget3.MoveTo(-6000, 0, 2000);
            World.AddEntity(dummyTarget3);
        }
    }
}
