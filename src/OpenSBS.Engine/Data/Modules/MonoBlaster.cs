using OpenSBS.Engine.Modules.Weapons;

namespace OpenSBS.Engine.Data.Modules
{
    public class MonoBlaster : WeaponModule
    {
        public MonoBlaster(string id) : base(id, "Mono Blaster")
        {
            Mass = 2000;
            Size = 4;
            Damage = 10;
            Range = 5000;
            CycleTime = 4;
        }
    }
}
