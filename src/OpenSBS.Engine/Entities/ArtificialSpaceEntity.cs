using System.Collections.Generic;

namespace OpenSBS.Engine.Entities
{
    public class ArtificialSpaceEntity : AbstractEntity
    {
        public ArtificialSpaceEntity(int hullpoints)
        {
            MaxHullpoints = Hullpoints = hullpoints;
        }

        public int Hullpoints { get; set; }
        public int MaxHullpoints { get; }

        public List<IModule> Modules { get; set; }
    }
}
