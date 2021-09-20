using System.Collections;
using System.Collections.Generic;

namespace OpenSBS.Engine.Models.Entities
{
    public class EntityTraceCollection : IEnumerable<EntityTrace>
    {
        private readonly IDictionary<string, EntityTrace> _traces;

        public EntityTraceCollection()
        {
            _traces = new Dictionary<string, EntityTrace>();
        }

        public EntityTrace Get(string entityId)
        {
            return _traces.ContainsKey(entityId) ? _traces[entityId] : null;
        }

        public void Update(Entity owner, Entity target, int range)
        {
            if (!_traces.ContainsKey(target.Id))
            {
                _traces[target.Id] = EntityTrace.ForEntity(target);
            }

            _traces[target.Id].Update(owner, target);
            if (_traces[target.Id].IsOutOfRange(range))
            {
                // TODO: Wrong! Should be marked as out-of-range without losing any data
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
