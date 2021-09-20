using OpenSBS.Engine.Models.Templates;

namespace OpenSBS.Engine.Data.Modules
{
    public class LimitedIonEngine : EngineModuleTemplate
    {
        private static readonly object ClassLock = new object();
        private static LimitedIonEngine _instance;

        public static LimitedIonEngine Instance
        {
            get
            {
                lock (ClassLock)
                {
                    return _instance ??= new LimitedIonEngine();
                }
            }
        }

        private LimitedIonEngine()
        {
            Name = "Limited Ion Engine";
            Mass = 5000;
            Size = 5;

            MaximumSpeed = 1000;
            Acceleration = 50;
            Deceleration = 50;
            RotationSpeed = 60;
        }
    }
}
