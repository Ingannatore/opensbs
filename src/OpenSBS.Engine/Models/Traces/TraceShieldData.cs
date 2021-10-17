using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Modules.Shields;

namespace OpenSBS.Engine.Models.Traces
{
    public class TraceShieldData
    {
        public bool IsRaised { get; protected set; }
        public double FrontRatio { get; protected set; }
        public double RightRatio { get; protected set; }
        public double LeftRatio { get; protected set; }
        public double RearRatio { get; protected set; }

        public void Update(ShieldModule module)
        {
            IsRaised = module.IsRaised;
            FrontRatio = module.Sectors.GetSectorRatio(EntitySide.Front);
            RightRatio = module.Sectors.GetSectorRatio(EntitySide.Right);
            LeftRatio = module.Sectors.GetSectorRatio(EntitySide.Left);
            RearRatio = module.Sectors.GetSectorRatio(EntitySide.Rear);
        }
    }
}
