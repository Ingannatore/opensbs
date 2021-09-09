using System;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Modules.Sensors
{
    public abstract class SensorsModule : Module
    {
        public int Range { get; protected set; }
        public SensorsTraceCollection Traces { get; }

        protected SensorsModule(string id, string name) : base(id, ModuleType.Sensors, name)
        {
            Traces = new SensorsTraceCollection();
        }

        public override void HandleAction(ClientAction action) { }

        public override void Update(TimeSpan deltaT, Entity owner, World world)
        {
            foreach (var entity in world)
            {
                Traces.Update(owner, entity, Range);
            }
        }
    }
}
