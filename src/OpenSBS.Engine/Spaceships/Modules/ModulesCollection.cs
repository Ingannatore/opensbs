using System;
using System.Collections;
using System.Collections.Generic;

namespace OpenSBS.Engine.Spaceships.Modules
{
    public class ModulesCollection : IEnumerable<Module>
    {
        private readonly SortedSet<Module> _modules;
        private readonly IDictionary<string, Module> _modulesIndex;

        public ModulesCollection()
        {
            _modules = new SortedSet<Module>();
            _modulesIndex = new Dictionary<string, Module>();
        }

        public Module Get(string id)
        {
            return _modulesIndex[id];
        }

        public void Add(Module module)
        {
            _modules.Add(module);
            _modulesIndex.Add(module.Id, module);
        }

        public void Remove(Module module)
        {
            _modules.Remove(module);
            _modulesIndex.Remove(module.Id);
        }

        public void Update(TimeSpan deltaT, Spaceship owner)
        {
            foreach (var module in _modules)
            {
                module.Update(deltaT, owner);
            }
        }

        public IEnumerator<Module> GetEnumerator()
        {
            return _modules.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
