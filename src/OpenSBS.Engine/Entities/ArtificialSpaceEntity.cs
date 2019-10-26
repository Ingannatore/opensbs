using System.Collections.Generic;

namespace OpenSBS.Engine.Entities
{
    public abstract class ArtificialSpaceEntity : Entity
    {
        public int Hullpoints { get; set; }
        public int MaxHullpoints { get; }
        public ICollection<IModule> Modules { get; }

        protected ArtificialSpaceEntity(int hullpoints)
        {
            MaxHullpoints = Hullpoints = hullpoints;
            Modules = new List<IModule>();
        }

        public void AddModules(IEnumerable<IModule> modules)
        {
            foreach (var module in modules)
            {
                Modules.Add(module);
            }
        }
    }
}
