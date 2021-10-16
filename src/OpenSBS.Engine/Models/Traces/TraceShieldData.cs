using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Modules.Shields;

namespace OpenSBS.Engine.Models.Traces
{
    public class TraceShieldData
    {
        public bool IsRaised { get; protected set; }
        public double FrontCapacity { get; protected set; }
        public double RightCapacity { get; protected set; }
        public double LeftCapacity { get; protected set; }
        public double RearCapacity { get; protected set; }

        public void Update(Entity owner)
        {
            var shieldModule = owner.Modules.FirstOrDefault<ShieldModule>();
            IsRaised = shieldModule?.IsRaised ?? false;
            FrontCapacity = shieldModule?.Sectors.GetSectorRatio(EntitySide.Front) ?? 0;
            RightCapacity = shieldModule?.Sectors.GetSectorRatio(EntitySide.Right) ?? 0;
            LeftCapacity = shieldModule?.Sectors.GetSectorRatio(EntitySide.Left) ?? 0;
            RearCapacity = shieldModule?.Sectors.GetSectorRatio(EntitySide.Rear) ?? 0;
        }
    }
}
