using OpenSBS.Engine.Models.Items;

namespace OpenSBS.Engine.Data.Items
{
    public class ScarletPlasmaAmmo : Item
    {
        private static readonly object ClassLock = new object();
        private static ScarletPlasmaAmmo _instance;

        public static ScarletPlasmaAmmo Instance
        {
            get
            {
                lock (ClassLock)
                {
                    return _instance ??= new ScarletPlasmaAmmo();
                }
            }
        }

        private ScarletPlasmaAmmo() : base(
            "ammo.plasma.scarlet",
            ItemType.AmmoPlasma,
            "Scarlet"
        )
        {
            Mass = 1;
        }
    }
}
