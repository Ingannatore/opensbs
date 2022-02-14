using System;
using System.Collections;
using System.Collections.Generic;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Models.Traces
{
    public class EntityTraceCollection : IEnumerable<EntityTrace>
    {
        private readonly Random _randomizer;
        private readonly SignatureGenerator _signatureGenerator;
        private readonly IDictionary<string, EntityTrace> _traces;

        public EntityTraceCollection()
        {
            _randomizer = new Random();
            _signatureGenerator = new SignatureGenerator(_randomizer);
            _traces = new Dictionary<string, EntityTrace>();
        }

        public void CompleteScansion(string entityId)
        {
            if (_traces.ContainsKey(entityId))
            {
                _traces[entityId].IncreaseScanLevel();
            }
        }

        public EntityTrace Get(string entityId)
        {
            return _traces.ContainsKey(entityId) ? _traces[entityId] : null;
        }

        public void Update(Entity owner, Entity target, int range)
        {
            if (!_traces.ContainsKey(target.Id))
            {
                _traces[target.Id] = EntityTrace.ForEntity(
                    target,
                    $"X-{_randomizer.Next(1, 99999):00000}",
                    _signatureGenerator.Generate()
                );
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
