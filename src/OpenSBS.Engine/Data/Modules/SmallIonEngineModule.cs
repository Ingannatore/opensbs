using OpenSBS.Engine.Models;
using OpenSBS.Engine.Spaceships.Modules;

namespace OpenSBS.Engine.Data.Modules
{
    public class SmallIonEngineModule : EngineModule
    {
        public SmallIonEngineModule(string id) : base(id, "4MN Ion Engine")
        {
            Mass = 5000;
            Size = ThingSize.Small;
            MaximumSpeed = 1000;
            Acceleration = 100;
            Deceleration = 100;
            RotationSpeed = 10;
        }
    }
}
