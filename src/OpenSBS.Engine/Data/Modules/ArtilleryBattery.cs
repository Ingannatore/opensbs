using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Items;
using OpenSBS.Engine.Models.Templates;

namespace OpenSBS.Engine.Data.Modules
{
    public class ArtilleryBattery : WeaponModuleTemplate
    {
        private static readonly object ClassLock = new object();
        private static ArtilleryBattery _instance;

        public static ArtilleryBattery Instance
        {
            get
            {
                lock (ClassLock)
                {
                    return _instance ??= new ArtilleryBattery();
                }
            }
        }

        private ArtilleryBattery()
        {
            Name = "Artillery Battery";
            ShortName = "Artillery Battery";
            Mass = 6000;
            Size = 8;

            Damage = 40;
            Range = 8000;
            AmmoType = ItemType.AmmoProjectile;
            AmmoPerCycle = 4;
            MagazineSize = 80;
            CycleTime = 8;
            ReloadTime = 20;
            FiringArcs = new[] { EntitySide.Left, EntitySide.Right };
        }
    }
}
