using System.Collections;
using System.Collections.Generic;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Modules
{
    public class SensorsTraceCollection : IEnumerable<SensorsTrace>
    {
        private readonly IDictionary<string, SensorsTrace> _traces;

        public SensorsTraceCollection()
        {
            _traces = new Dictionary<string, SensorsTrace>();
        }

        public void Add(SensorsTrace trace)
        {
            _traces[trace.Id] = trace;
        }

        public SensorsTrace Get(string entityId)
        {
            return _traces[entityId];
        }

        public bool Exists(Entity target)
        {
            return _traces.ContainsKey(target.Id);
        }

        public void Update(Entity owner, Entity target, int range)
        {
            if (!_traces.ContainsKey(target.Id))
            {
                _traces[target.Id] = SensorsTrace.ForEntity(target);
            }

            _traces[target.Id].Update(owner, target);
            if (_traces[target.Id].Distance > range)
            {
                _traces.Remove(target.Id);
            }
        }

        public void Remove(string entityId)
        {
            _traces.Remove(entityId);
        }

        public IEnumerator<SensorsTrace> GetEnumerator()
        {
            return _traces.Values.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
