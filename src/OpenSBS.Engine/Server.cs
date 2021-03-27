using System;
using OpenSBS.Engine.Data;
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
        private readonly DataLibrary _dataLibrary;

        public Server(IServerClock clock, IStateSender stateSender)
        {
            _serverClock = clock;
            _serverClock.RegisterOnTickEventHandler(OnClockTick);
            _stateSender = stateSender;

            _incomingCommands = new SimpleQueue<ClientAction>();
            _dataLibrary = new DataLibrary();

            State = new ServerState(
                _dataLibrary.AvailableMissions,
                _dataLibrary.AvailableSpaceships
            );
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
                    InitServer(action.PayloadTo<ServerInitPayload>());
                    break;
            }
        }

        private void InitServer(ServerInitPayload payload)
        {
            Mission = _dataLibrary.CreateMission(payload.Mission);
            Mission.Init();
            _serverClock.Start();
        }
    }
}
