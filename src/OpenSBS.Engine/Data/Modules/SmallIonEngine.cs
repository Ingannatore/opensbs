using OpenSBS.Engine.Modules;
using OpenSBS.Engine.Modules.Engines;

namespace OpenSBS.Engine.Data.Modules
{
    public class SmallIonEngine : EngineModule
    {
        public SmallIonEngine(string id) : base(id, "4MN Ion Engine")
        {
            Mass = 5000;
            Size = 5;
            MaximumSpeed = 1000;
            Acceleration = 50;
            Deceleration = 50;
            RotationSpeed = 60;
        }
    }
}
