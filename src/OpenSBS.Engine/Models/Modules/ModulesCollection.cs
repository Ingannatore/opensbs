using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Models.Modules
{
    public class ModulesCollection : IEnumerable<IModule>
    {
        private readonly ICollection<IModule> _modules;
        private readonly IDictionary<string, IModule> _modulesIndex;

        public ModulesCollection()
        {
            _modules = new List<IModule>();
            _modulesIndex = new Dictionary<string, IModule>();
        }

        public IModule Get(string id)
        {
            return _modulesIndex[id];
        }

        public T FirstOrDefault<T>() where T : IModule
        {
            return _modules.OfType<T>().FirstOrDefault();
        }

        public void Add(IModule module)
        {
            _modules.Add(module);
            _modulesIndex.Add(module.Id, module);
        }

        public void Remove(IModule module)
        {
            _modules.Remove(module);
            _modulesIndex.Remove(module.Id);
        }

        public void Update(TimeSpan deltaT, Entity owner, World world)
        {
            foreach (var module in _modules)
            {
                module.Update(deltaT, owner, world);
            }
        }

        public IEnumerator<IModule> GetEnumerator()
        {
            return _modules.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
