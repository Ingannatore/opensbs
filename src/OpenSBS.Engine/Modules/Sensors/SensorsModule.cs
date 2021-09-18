using System;
using OpenSBS.Engine.Models;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Modules.Sensors
{
    public abstract class SensorsModule : Module
    {
        public int Range { get; protected set; }
        public EntityTraceCollection Traces { get; }

        protected SensorsModule(string id, string name) : base(id, ModuleType.Sensors, name)
        {
            Traces = new EntityTraceCollection();
        }

        public override void HandleAction(ClientAction action) { }

        public override void Update(TimeSpan deltaT, Entity owner, World world)
        {
            foreach (var trace in Traces)
            {
                if (!world.ExistsEntity(trace.Id))
                {
                    Traces.Remove(trace.Id);
                }
            }

            foreach (var entity in world)
            {
                Traces.Update(owner, entity, Range);
            }
        }
    }
}
