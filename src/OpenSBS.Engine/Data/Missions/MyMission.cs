using OpenSBS.Engine.Data.Items;
using OpenSBS.Engine.Data.Spaceships;
using OpenSBS.Engine.Models;
using OpenSBS.Engine.Models.Entities;

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
            var container = new FloatingContainer("CONTAINER_1", "Container 1", "CNT-001");
            container.MoveTo(2000, 0, 0);
            World.AddEntity(container);

            var dummyTarget = new DummyTarget("DUMMY_1", "Dummy 1", "DMY-001");
            dummyTarget.MoveTo(-6000, 0, 2000);
            dummyTarget.AssignReputation(-1);
            World.AddEntity(dummyTarget);

            Spaceship.Cargo.Add(ScarletPlasmaAmmo.Instance, 100);
            Spaceship.Cargo.Add(VioletPlasmaAmmo.Instance, 80);
            Spaceship.Cargo.Add(LanceProjectileAmmo.Instance, 200);
        }
    }
}
