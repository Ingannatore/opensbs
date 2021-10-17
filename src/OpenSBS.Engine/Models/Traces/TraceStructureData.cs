using System.Collections.Generic;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Models.Traces
{
    public class TraceStructureData
    {
        public double HullRatio { get; protected set; }
        public ICollection<string> Modules { get; }

        public TraceStructureData()
        {
            Modules = new List<string>();
        }

        public void Update(Entity target)
        {
            HullRatio = target.Hull.Ratio;

            Modules.Clear();
            foreach (var module in target.Modules)
            {
                Modules.Add(module.ShortName);
            }
        }
    }
}
