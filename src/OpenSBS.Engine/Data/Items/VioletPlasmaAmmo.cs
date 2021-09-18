using OpenSBS.Engine.Models.Items;

namespace OpenSBS.Engine.Data.Items
{
    public class VioletPlasmaAmmo : Item
    {
        private static readonly object ClassLock = new object();
        private static VioletPlasmaAmmo _instance;

        public static VioletPlasmaAmmo Instance
        {
            get
            {
                lock (ClassLock)
                {
                    return _instance ??= new VioletPlasmaAmmo();
                }
            }
        }

        private VioletPlasmaAmmo() : base(
            "ammo.plasma.violet",
            "ammo.plasma",
            "Violet"
        )
        {
            Mass = 1;
        }
    }
}
