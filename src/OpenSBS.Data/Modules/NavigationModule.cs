using System;
using System.Collections.Generic;
using System.Numerics;
using OpenSBS.Engine.Entities;
using OpenSBS.Engine.Exceptions;
using OpenSBS.Engine.Messages;

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

        public override void HandleMessage(Message message)
        {
            switch (message.Command)
            {
                case "selectWaypoint":
                    SelectWaypoint(message.Content.ToObject<int>());
                    break;
                default:
                    throw new UnknownModuleCommandException(this, message);
            }
        }

        private void SelectWaypoint(int id) { }
    }
}
