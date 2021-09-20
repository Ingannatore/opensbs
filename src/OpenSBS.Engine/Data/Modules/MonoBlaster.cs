using OpenSBS.Engine.Models.Templates;

namespace OpenSBS.Engine.Data.Modules
{
    public class MonoBlaster : WeaponModuleTemplate
    {
        private static readonly object ClassLock = new object();
        private static MonoBlaster _instance;

        public static MonoBlaster Instance
        {
            get
            {
                lock (ClassLock)
                {
                    return _instance ??= new MonoBlaster();
                }
            }
        }

        private MonoBlaster()
        {
            Name = "Mono Blaster";
            Mass = 2000;
            Size = 4;

            Damage = 10;
            Range = 5000;
            CycleTime = 4;
        }
    }
}
