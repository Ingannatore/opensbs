using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Items;
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

            Damage = 1;
            Range = 5000;
            AmmoType = ItemType.AmmoPlasma;
            AmmoPerCycle = 1;
            MagazineSize = 4;
            CycleTime = 4;
            ReloadTime = 12;
            FiringArcs = new[] { EntitySide.Front };
        }
    }
}
