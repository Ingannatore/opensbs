using System.Collections.Generic;

namespace OpenSBS.Engine.Entities
{
    public abstract class ArtificialSpaceEntity : Entity
    {
        public ICollection<IModule> Modules { get; }
        public int Hullpoints { get; protected set; }
        public int MaxHullpoints { get; protected set; }
        public bool IsDestroyed => Hullpoints <= 0;

        protected ArtificialSpaceEntity(string id, string name, string type, int hullpoints) : base(id, name, type)
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

        public void ApplyDamage(int value)
        {
            Hullpoints -= value;
        }
    }
}
