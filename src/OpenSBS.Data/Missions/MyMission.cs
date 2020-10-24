using System;
using OpenSBS.Data.Ships;
using OpenSBS.Engine;
using OpenSBS.Engine.Entities;
using OpenSBS.Engine.Missions;

namespace OpenSBS.Data.Missions
{
    [Mission("My Test Mission", Description = "Just a simple test mission, nothing fancy.")]
    public class MyMission : Mission
    {
        public override void Initialize()
        {
            var ship = new Ship("PLAYER_SHIP", "Archimedes");
            Game.Instance.AddBrain(new Brain(ship));

            var dummyTarget1 = new DummyTarget("DUMMY_1", "Dummy 1");
            dummyTarget1.SetPosition(2000, 0, 0);
            Game.Instance.AddEntity(dummyTarget1);

            var dummyTarget2 = new DummyTarget("DUMMY_2", "Dummy 2");
            dummyTarget2.SetPosition(500, -4000, 0);
            Game.Instance.AddEntity(dummyTarget2);

            var dummyTarget3 = new DummyTarget("DUMMY_3", "Dummy 3");
            dummyTarget3.SetPosition(-8000, 2000, 0);
            Game.Instance.AddEntity(dummyTarget3);
        }

        public override void Update(TimeSpan timeSpan) { }
    }
}
