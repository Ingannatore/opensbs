using System;
using System.Threading.Tasks;
using OpenSBS.Engine.Commands;
using OpenSBS.Engine.Missions;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine
{
    public class Server
    {
        public readonly ServerState State;

        private readonly GameCommandQueue _incomingCommands;
        private readonly GameCommandQueue _outgoingCommands;
        private readonly GameClock _gameClock;
        private readonly MissionRepository _missionRepository;
        private event EventHandler AfterTickEventHandler;
        private Game _game;

        public Server()
        {
            _incomingCommands = new GameCommandQueue();
            _outgoingCommands = new GameCommandQueue();
            _gameClock = new GameClock();
            _missionRepository = new MissionRepository();
            _gameClock.AddOnTickEventHandler(OnGameClockTick);
            State = new ServerState(_missionRepository.AvailableMissions);
        }

        public async Task EnqueueIncomingCommand(GameCommand command)
        {
            await _incomingCommands.Enqueue(command);
        }

        public void AddOnAfterTickEventHandler(EventHandler handler)
        {
            AfterTickEventHandler -= handler;
            AfterTickEventHandler += handler;
        }

        private void OnGameClockTick(object sender, TimeSpan deltaT)
        {
            foreach (var command in _incomingCommands.DequeueAll())
            {
                if (command.IsServerCommand())
                {
                    HandleServerCommand(command);
                }
            }

            _game.OnTick(deltaT);
            State.Update(
                _game != null,
                _gameClock.IsRunning,
                _gameClock.LastTick.Ticks,
                _gameClock.LastDeltaT.Milliseconds
            );

            AfterTickEventHandler?.Invoke(this, EventArgs.Empty);
        }

        private void HandleServerCommand(GameCommand command)
        {
            switch (command.Name)
            {
                case "server/startMission":
                    _game = new Game(_missionRepository.GetMissionType(command.Payload));
                    _gameClock.Start();
                    break;
            }
        }
    }
}
