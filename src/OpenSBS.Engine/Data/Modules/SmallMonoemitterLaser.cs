using OpenSBS.Engine.Modules;
using OpenSBS.Engine.Modules.Weapons;

namespace OpenSBS.Engine.Data.Modules
{
    public class SmallMonoemitterLaser : WeaponModule
    {
        public SmallMonoemitterLaser(string id) : base(id, "Small Monoemitter Laser")
        {
            Mass = 2000;
            Size = 4;
            Damage = 10;
            Range = 5000;
            RateOfFire = 5;
        }
    }
}
