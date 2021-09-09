using OpenSBS.Engine.Modules.Shields;

namespace OpenSBS.Engine.Data.Modules
{
    public class PrototypeMagneticShield : ShieldModule
    {
        public PrototypeMagneticShield(string id) : base(id, "Prototype Magnetic Shield")
        {
            Mass = 10000;
            Size = 5;
            BaseCapacity = 100;
            BaseRechargeRate = 4;
        }
    }
}
