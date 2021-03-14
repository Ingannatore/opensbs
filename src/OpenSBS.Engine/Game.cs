using System;
using OpenSBS.Engine.Missions;

namespace OpenSBS.Engine
{
    public class Game
    {
        public World World { get; }

        private readonly Mission _mission;

        public Game(Mission mission)
        {
            World = new World();

            _mission = mission;
            _mission.Init(World);
        }

        public void Update(TimeSpan deltaT)
        {
            World.Update(deltaT);
            _mission.Update(World, deltaT);
        }
    }
}
