using System;
using OpenSBS.Engine.Missions;
using OpenSBS.Engine.Models;
using OpenSBS.Engine.Utils;

namespace OpenSBS.Engine
{
    public class Server
    {
        public ServerState State { get; }
        public Mission Mission { get; private set; }

        private readonly IServerClock _serverClock;
        private readonly IStateSender _stateSender;
        private readonly SimpleQueue<ClientAction> _incomingCommands;
        private readonly MissionRepository _missionRepository;

        public Server(IServerClock clock, IStateSender stateSender)
        {
            _serverClock = clock;
            _serverClock.RegisterOnTickEventHandler(OnClockTick);
            _stateSender = stateSender;

            _incomingCommands = new SimpleQueue<ClientAction>();
            _missionRepository = new MissionRepository();

            State = new ServerState(_missionRepository.AvailableMissions);
        }

        public void HandleAction(ClientAction action)
        {
            if (action.IsServerRecipient())
            {
                HandleServerAction(action);
            }
            else
            {
                _incomingCommands.Enqueue(action);
            }
        }

        private void OnClockTick(object sender, TimeSpan deltaT)
        {
            foreach (var action in _incomingCommands.DequeueAll())
            {
                Mission.Spaceship.HandleAction(action);
            }

            Mission.Update(deltaT);
            State.Update(
                Mission != null,
                _serverClock.IsRunning,
                _serverClock.LastTick.Ticks,
                _serverClock.LastDeltaT.Milliseconds
            );

            _stateSender.Send(new ClientAction("server/refresh", State));
            _stateSender.Send(new ClientAction("spaceship/refresh", Mission.Spaceship));
        }

        private void HandleServerAction(ClientAction action)
        {
            switch (action.Type)
            {
                case "server/init":
                    InitServer(action.PayloadTo<string>());
                    break;
            }
        }

        private void InitServer(string missionId)
        {
            Mission = _missionRepository.CreateInstance(missionId);
            Mission.Init();
            _serverClock.Start();
        }
    }
}
