using System;
using System.Collections.Generic;
using System.Numerics;
using OpenSBS.Core.Commands;
using OpenSBS.Engine.Entities;
using OpenSBS.Engine.Exceptions;

namespace OpenSBS.Data.Modules
{
    public class NavigationModule : Module
    {
        public Waypoint SelectedWaypoint { get; }
        public IList<Waypoint> Waypoints { get; }

        public NavigationModule(string id) : base(id, "navigation")
        {
            Waypoints = new List<Waypoint>
            {
                new Waypoint(1, new Vector3(-4000, -3000, 0)),
                new Waypoint(2, new Vector3(-30000, -3000, 0))
            };
            SelectedWaypoint = null;
        }

        public override void Update(TimeSpan timeSpan)
        {
            foreach (var waypoint in Waypoints)
            {
                waypoint
                    .UpdateDistance(Owner.Position)
                    .UpdateDirection(Owner.Position);
            }
        }

        public override void HandleMessage(GameCommand command)
        {
            switch (command.Name)
            {
                case "selectWaypoint":
                    SelectWaypoint(command.GetPayload<int>());
                    break;
                default:
                    throw new UnknownModuleCommandException(this, command);
            }
        }

        private void SelectWaypoint(int id) { }
    }
}
