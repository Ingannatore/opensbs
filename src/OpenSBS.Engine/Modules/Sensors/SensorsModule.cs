using System;
using OpenSBS.Engine.Models;
using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Modules;
using OpenSBS.Engine.Models.Templates;
using OpenSBS.Engine.Models.Traces;

namespace OpenSBS.Engine.Modules.Sensors
{
    public class SensorsModule : Module<SensorsModuleTemplate>
    {
        private const string ScanCompletedAction = "scanCompleted";

        public EntityTraceCollection Traces { get; }
        public int Range => Template.Range;

        public static SensorsModule Create(SensorsModuleTemplate template)
        {
            return new SensorsModule(template);
        }

        private SensorsModule(SensorsModuleTemplate template) : base(ModuleType.Sensors, template)
        {
            Traces = new EntityTraceCollection();
        }

        public EntityTrace GetTrace(string entityId)
        {
            return Traces.Get(entityId);
        }

        public override void HandleAction(ClientAction action, Entity owner)
        {
            switch (action.Type)
            {
                case ScanCompletedAction:
                    Traces.CompleteScansion(action.PayloadTo<string>());
                    break;
            }
        }

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
                Traces.Update(owner, entity, Template.Range);
            }
        }
    }
}
