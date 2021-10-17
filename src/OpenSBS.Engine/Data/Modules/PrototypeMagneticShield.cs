using OpenSBS.Engine.Models.Templates;

namespace OpenSBS.Engine.Data.Modules
{
    public class PrototypeMagneticShield : ShieldModuleTemplate
    {
        private static readonly object ClassLock = new object();
        private static PrototypeMagneticShield _instance;

        public static PrototypeMagneticShield Instance
        {
            get
            {
                lock (ClassLock)
                {
                    return _instance ??= new PrototypeMagneticShield();
                }
            }
        }

        private PrototypeMagneticShield()
        {
            Name = "Prototype Magnetic Shielding";
            ShortName = "Prot Mag Shld";
            Mass = 2000;
            Size = 4;

            Capacity = 100;
            RechargeRate = 4;
        }
    }
}
