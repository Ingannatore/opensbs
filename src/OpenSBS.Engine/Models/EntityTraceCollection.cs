using System.Collections;
using System.Collections.Generic;

namespace OpenSBS.Engine.Models
{
    public class EntityTraceCollection : IEnumerable<EntityTrace>
    {
        private readonly IDictionary<string, EntityTrace> _traces;

        public EntityTraceCollection()
        {
            _traces = new Dictionary<string, EntityTrace>();
        }

        public void Add(EntityTrace trace)
        {
            _traces[trace.Id] = trace;
        }

        public EntityTrace Get(string entityId)
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
                _traces[target.Id] = EntityTrace.ForEntity(target);
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

        public IEnumerator<EntityTrace> GetEnumerator()
        {
            return _traces.Values.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
