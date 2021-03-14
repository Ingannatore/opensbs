using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OpenSBS.Engine.Commands;
using OpenSBS.Engine.Missions;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine
{
    public class Game
    {
        private readonly ICollection<Thing> _entities;
        private readonly IDictionary<string, Brain> _brains;
        private readonly Mission _mission;

        public Game(Type missionType)
        {
            _entities = new List<Thing>();
            _brains = new Dictionary<string, Brain>();

            _mission = (Mission) Activator.CreateInstance(missionType, this);
        }

        public void AddEntity(Thing thing)
        {
            _entities.Add(thing);
        }

        public void AddBrain(Brain brain)
        {
            AddEntity(brain.Thing);
            _brains.Add(brain.Id, brain);
        }

        public async Task EnqueueCommand(GameCommand command)
        {
            await _brains[command.Meta.Entity].EnqueueCommand(command);
        }

        public void Update(TimeSpan deltaT)
        {
            foreach (var brain in _brains.Values)
            {
                brain.Update(deltaT);
            }

            _mission.Update(deltaT);
        }
    }
}
