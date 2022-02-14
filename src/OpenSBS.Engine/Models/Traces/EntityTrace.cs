using System.Collections.Generic;
using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Modules.Shields;

namespace OpenSBS.Engine.Models.Traces
{
    public class EntityTrace
    {
        public string Id { get; }
        public int ScanLevel { get; private set; }
        public string[,] Signature { get; }
        public string Type { get; private set; }
        public string CallSign { get; private set; }
        public int? Reputation { get; private set; }
        public TraceSpatialData Spatial { get; }
        public TraceShieldData Shield { get; private set; }

        public static EntityTrace ForEntity(Entity entity, string initialCallSign, string[,] signature)
        {
            return new EntityTrace(entity.Id, initialCallSign, signature);
        }

        private EntityTrace(string id, string initialCallSign, string[,] signature)
        {
            Id = id;
            ScanLevel = 0;
            Signature = signature;
            Type = EntityType.Unknown;
            CallSign = initialCallSign;
            Reputation = null;

            Spatial = new TraceSpatialData();
            Shield = null;
        }

        public void IncreaseScanLevel(int amount = 1)
        {
            ScanLevel += amount;
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
            if (ScanLevel < 1)
            {
                return;
            }

            var shieldModule = target.Modules.FirstOrDefault<ShieldModule>();
            if (shieldModule != null)
            {
                Shield ??= new TraceShieldData();
                Shield.Update(shieldModule);
            }

            Type = target.Type;
            CallSign = target.CallSign;
            Reputation = target.Reputation;
        }
    }
}
