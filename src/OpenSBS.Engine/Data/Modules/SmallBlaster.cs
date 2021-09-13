using OpenSBS.Engine.Modules.Weapons;

namespace OpenSBS.Engine.Data.Modules
{
    public class SmallBlaster : WeaponModule
    {
        public SmallBlaster(string id) : base(id, "Blaster S")
        {
            Mass = 2000;
            Size = 4;
            Damage = 10;
            Range = 5000;
            RateOfFire = 5;
        }
    }
}
