using OpenSBS.Core.Utils;
using System.Numerics;

namespace OpenSBS.Core.Models
{
    internal class EntityTrace
    {
        public string Id { get; }
        public int Bearing { get; protected set; }
        public int Distance { get; protected set; }

        public EntityTrace(string id)
        {
            Id = id;
        }

        public void Update(Entity owner, Entity target)
        {
            Bearing = (int)Math.Round(Angles.ToBearing(Vector3.Normalize(target.Body.Position - owner.Body.Position)));
            Distance = (int)Math.Round(Vector3.Distance(owner.Body.Position, target.Body.Position));
        }
    }
}
