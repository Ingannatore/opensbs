using System.Collections;

namespace OpenSBS.Core.Models
{
    internal class EntityTraceCollection : IEnumerable<EntityTrace>
    {
        private readonly IDictionary<string, EntityTrace> _traces;

        public EntityTraceCollection()
        {
            _traces = new Dictionary<string, EntityTrace>();
        }

        public EntityTrace GetOrCreateTrace(string id)
        {
            if (!_traces.ContainsKey(id))
            {
                _traces[id] = new(id);
            }

            return _traces[id];
        }

        public void Remove(string id) => _traces.Remove(id);

        public void RemoveInexistent(IEnumerable<string> existingIds) =>
            _traces.Keys.Except(existingIds).ToList().ForEach(id => _traces.Remove(id));

        public IEnumerator<EntityTrace> GetEnumerator() => _traces.Values.GetEnumerator();
        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }
}
