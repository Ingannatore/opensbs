using OpenSBS.Engine.Models.Items;

namespace OpenSBS.Engine.Data.Items
{
    public class LanceProjectileAmmo : Item
    {
        private static readonly object ClassLock = new object();
        private static LanceProjectileAmmo _instance;

        public static LanceProjectileAmmo Instance
        {
            get
            {
                lock (ClassLock)
                {
                    return _instance ??= new LanceProjectileAmmo();
                }
            }
        }

        private LanceProjectileAmmo() : base(
            "ammo.projectile.lance",
            ItemType.AmmoProjectile,
            "Lance"
        )
        {
            Mass = 1;
        }
    }
}
