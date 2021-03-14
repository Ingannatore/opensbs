using System;
using OpenSBS.Engine.Data.Spaceships;
using OpenSBS.Engine.Missions;

namespace OpenSBS.Engine.Data.Missions
{
    [Mission("My Test Mission", Description = "Just a simple test mission, nothing fancy.")]
    public class MyMission : Mission
    {
        public override void Init(World world)
        {
            var ship = new ViperInterceptorSpaceship("PLAYER_SHIP", "Archimedes", "ARC-927");
            world.Add(ship);

            var dummyTarget1 = new DummyTargetSpaceship("DUMMY_1", "Dummy 1", "DT-1");
            dummyTarget1.MoveTo(2000, 0, 0);
            world.Add(dummyTarget1);

            var dummyTarget2 = new DummyTargetSpaceship("DUMMY_2", "Dummy 2", "DT-2");
            dummyTarget2.MoveTo(500, -4000, 0);
            world.Add(dummyTarget2);

            var dummyTarget3 = new DummyTargetSpaceship("DUMMY_3", "Dummy 3", "DT-3");
            dummyTarget3.MoveTo(-8000, 2000, 0);
            world.Add(dummyTarget3);
        }

        public override void Update(World world, TimeSpan deltaT) { }
    }
}
