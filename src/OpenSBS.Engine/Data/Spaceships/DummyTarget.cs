using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Data.Spaceships
{
    public class DummyTarget : Entity
    {
        public DummyTarget(string id, string name, string callSign) : base(
            id, EntityType.Dummy, name, callSign
        )
        {
            Mass = 1000;
            Size = 50;
        }
    }
}
