using System.Collections.Generic;
using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Modules.Shields;

namespace OpenSBS.Engine.Models.Traces
{
    public class EntityTrace
    {
        public string Id { get; }
        public int ScanLevel { get; }
        public string Type { get; }
        public string CallSign { get; }
        public int Reputation { get; private set; }
        public TraceSpatialData Spatial { get; }
        public TraceShieldData Shield { get; private set; }

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
            Shield = null;
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
            Reputation = target.Reputation;
            Spatial.Update(owner, target);

            var shieldModule = target.Modules.FirstOrDefault<ShieldModule>();
            if (shieldModule != null)
            {
                Shield ??= new TraceShieldData();
                Shield.Update(shieldModule);
            }
        }
    }
}
