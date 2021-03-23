using OpenSBS.Engine.Modules;

namespace OpenSBS.Engine.Data.Modules
{
    public class SmallIonEngine : EngineModule
    {
        public SmallIonEngine(string id) : base(id, "4MN Ion Engine")
        {
            Mass = 5000;
            Size = 5;
            MaximumSpeed = 1000;
            Acceleration = 100;
            Deceleration = 100;
            RotationSpeed = 30;
        }
    }
}
