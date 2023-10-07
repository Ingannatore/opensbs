using OpenSBS.Core.Models;

namespace OpenSBS.Core.Components
{
    internal class ElectronicComponent
    {
        public IEnumerable<EntityTrace> Traces => _traces.Values;

        private readonly IDictionary<string, EntityTrace> _traces;

        public ElectronicComponent()
        {
            _traces = new Dictionary<string, EntityTrace>();
        }

        public void HandleCommand(ComponentCommand command)
        {
            throw new NotImplementedException();
        }

        public void Update(TimeSpan deltaT, Entity owner, World world)
        {
            UpdateTraces(owner, world);
        }

        private void UpdateTraces(Entity owner, World world)
        {
            foreach (var trace in _traces.Values)
            {
                if (!world.ExistsEntity(trace.Id))
                {
                    _traces.Remove(trace.Id);
                }
            }

            foreach (var entity in world)
            {
                if (!_traces.ContainsKey(entity.Id))
                {
                    _traces[entity.Id] = new(entity.Id);
                }

                _traces[entity.Id].Update(owner, entity);
            }
        }
    }
}
