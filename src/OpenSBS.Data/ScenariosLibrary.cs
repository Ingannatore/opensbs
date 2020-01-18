using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using OpenSBS.Engine;
using OpenSBS.Engine.Attributes;
using OpenSBS.Engine.Entities;
using OpenSBS.Engine.Exceptions;

namespace OpenSBS.Data
{
    public class ScenariosLibrary : Singleton<ScenariosLibrary>
    {
        private readonly Assembly _assembly;
        private readonly IDictionary<string, ScenarioInfo> _scenarios;
        public IEnumerable<ScenarioInfo> AvailableScenarios => _scenarios.Values.ToList();

        public ScenariosLibrary()
        {
            _assembly = typeof(ScenariosLibrary).Assembly;
            _scenarios = new Dictionary<string, ScenarioInfo>();
        }

        public void LoadScenarios()
        {
            _scenarios.Clear();

            foreach (var scenarioType in GetScenarios())
            {
                var info = new ScenarioInfo(scenarioType);
                _scenarios.Add(info.Guid.ToString(), info);
            }
        }

        public Scenario InstantiateScenario(string id)
        {
            if (!_scenarios.ContainsKey(id))
            {
                throw new UnknownScenarioException(id);
            }

            return (Scenario) Activator.CreateInstance(_scenarios[id].Type);
        }

        private IEnumerable<Type> GetScenarios()
        {
            return _assembly
                .GetTypes()
                .Where(t => t.IsDefined(typeof(ScenarioAttribute), false));
        }
    }
}
