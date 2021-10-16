using System.Collections.Generic;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Models.Traces
{
    public class EntityTrace
    {
        public string Id { get; }
        public int ScanLevel { get; }
        public string Type { get; }
        public string CallSign { get; }
        public int Reputation { get; }
        public TraceSpatialData Spatial { get; }
        public TraceShieldData Shield { get; }
        public TraceStructureData Structure { get; }

        public static EntityTrace ForEntity(Entity entity)
        {
            return new EntityTrace(entity.Id, entity.Type, entity.CallSign);
        }

        private EntityTrace(string id, string type, string callSign)
        {
            Id = id;
            ScanLevel = 2;
            Type = type;
            CallSign = callSign;
            Reputation = 0;

            Spatial = new TraceSpatialData();
            Shield = new TraceShieldData();
            Structure = new TraceStructureData();
        }

        public bool IsOutOfRange(int range)
        {
            return Spatial.IsOutOfRange(range);
        }

        public bool IsOutOfFiringArc(IEnumerable<string> firingArcs)
        {
            return Spatial.IsOutOfFiringArc(firingArcs);
        }

        public void Update(Entity owner, Entity target)
        {
            Spatial.Update(owner, target);
            Shield.Update(owner);
            Structure.Update(owner);
        }
    }
}
