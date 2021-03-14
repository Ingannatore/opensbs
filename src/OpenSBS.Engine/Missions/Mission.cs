using System;

namespace OpenSBS.Engine.Missions
{
    public abstract class Mission
    {
        protected readonly Game Game;

        protected Mission(Game game)
        {
            Game = game;
        }

        public abstract void Update(TimeSpan deltaT);
    }
}
