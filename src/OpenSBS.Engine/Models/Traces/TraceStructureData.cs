using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Models.Traces
{
    public class TraceStructureData
    {
        public double HullRation { get; protected set; }

        public void Update(Entity owner)
        {
            HullRation = owner.Hull.Ratio;
        }
    }
}
