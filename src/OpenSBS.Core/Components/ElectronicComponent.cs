using OpenSBS.Core.Models;

namespace OpenSBS.Core.Components
{
    internal class ElectronicComponent
    {
        public int SensorsRange { get; }
        public EntityTraceCollection Traces { get; private set; }

        public ElectronicComponent(int sensorsRange)
        {
            SensorsRange = sensorsRange;
            Traces = new();
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
            Traces.RemoveInexistent(world.GetIds());

            foreach (var entity in world)
            {
                var distance = owner.GetDistanceTo(entity.Body.Position);
                if (distance > SensorsRange)
                {
                    Traces.Remove(entity.Id);
                    continue;
                }

                Traces.GetOrCreateTrace(entity.Id).Update(owner.GetBearingTo(entity.Body.Position), distance);
            }
        }
    }
}
