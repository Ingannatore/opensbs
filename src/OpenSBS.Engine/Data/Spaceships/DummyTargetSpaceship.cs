using OpenSBS.Engine.Models;
using OpenSBS.Engine.Spaceships;

namespace OpenSBS.Engine.Data.Spaceships
{
    public class DummyTargetSpaceship : Spaceship
    {
        public DummyTargetSpaceship(string id, string name, string callSign) : base(id, name, callSign)
        {
            Type = SpaceshipType.Dummy;
            Description = "Small Dummy Target";
            Mass = 1000;
            Size = ThingSize.Small;
        }
    }
}
