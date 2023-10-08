using OpenSBS.Core.Models;
using System.Numerics;

namespace OpenSBS.Core.Components
{
    internal class ElectronicComponent
    {
        private const string AddWaypointAction = "waypoint.add";
        private const string RemoveWaypointAction = "waypoint.remove";

        public int SensorsRange { get; }
        public EntityTraceCollection Traces { get; private set; }
        public IList<Waypoint> Waypoints { get; private set; }

        public ElectronicComponent(int sensorsRange)
        {
            SensorsRange = sensorsRange;
            Traces = new();
            Waypoints = new List<Waypoint>();
        }

        public void HandleCommand(ComponentCommand command)
        {
            switch (command.Action)
            {
                case AddWaypointAction:
                    Waypoints.Add(new(command.PayloadTo<Vector2>()));
                    break;

                case RemoveWaypointAction:
                    var index = command.PayloadTo<int>();
                    if (index < Waypoints.Count) Waypoints.RemoveAt(index);
                    break;
            }
        }

        public void Update(TimeSpan deltaT, Entity owner, World world)
        {
            UpdateTraces(owner, world);
            UpdateWaypoints(owner);
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

                Traces
                    .GetOrCreateTrace(entity.Id)
                    .Update(owner.GetBearingTo(entity.Body.Position), distance);
            }
        }

        private void UpdateWaypoints(Entity owner)
        {
            foreach (var waypoint in Waypoints)
            {
                waypoint.Update(
                    owner.GetBearingTo(waypoint.Position),
                    owner.GetDistanceTo(waypoint.Position)
                );
            }
        }
    }
}
