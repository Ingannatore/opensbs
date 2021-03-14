﻿using System;
using System.Threading.Tasks;
using OpenSBS.Engine.Missions;
using OpenSBS.Engine.Models;
using OpenSBS.Engine.Utils;

namespace OpenSBS.Engine
{
    public class Server
    {
        public readonly ServerState State;

        private readonly GameClock _gameClock;
        private readonly SimpleQueue<GameAction> _incomingCommands;
        private readonly MissionRepository _missionRepository;
        private event EventHandler AfterTickEventHandler;
        private Game _game;

        public Server()
        {
            _gameClock = new GameClock();
            _gameClock.AddOnTickEventHandler(OnGameClockTick);

            _incomingCommands = new SimpleQueue<GameAction>();
            _missionRepository = new MissionRepository();

            State = new ServerState(_missionRepository.AvailableMissions);
        }

        public async Task EnqueueAction(GameAction action)
        {
            await _incomingCommands.Enqueue(action);
        }

        public void AddOnAfterTickEventHandler(EventHandler handler)
        {
            AfterTickEventHandler -= handler;
            AfterTickEventHandler += handler;
        }

        private void OnGameClockTick(object sender, TimeSpan deltaT)
        {
            foreach (var action in _incomingCommands.DequeueAll())
            {
                if (action.Meta == null)
                {
                    HandleServerAction(action);
                }
            }

            _game.Update(deltaT);
            State.Update(
                _game != null,
                _gameClock.IsRunning,
                _gameClock.LastTick.Ticks,
                _gameClock.LastDeltaT.Milliseconds
            );

            AfterTickEventHandler?.Invoke(this, EventArgs.Empty);
        }

        private void HandleServerAction(GameAction action)
        {
            switch (action.Type)
            {
                case "server/startMission":
                    _game = new Game(_missionRepository.CreateInstance(action.PayloadTo<string>()));
                    _gameClock.Start();
                    break;
            }
        }
    }
}
