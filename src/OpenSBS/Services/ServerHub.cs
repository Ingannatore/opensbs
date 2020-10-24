using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OpenSBS.Data;
using OpenSBS.Engine;
using OpenSBS.Engine.Commands;
using OpenSBS.Engine.Server;

namespace OpenSBS.Services
{
    public class ServerHub : Hub
    {
        private readonly ClockService _clockService;
        private readonly StateService _stateService;

        public ServerHub(ClockService clockService, StateService stateService)
        {
            _clockService = clockService;
            _stateService = stateService;
        }

        public async Task<GameCommand> OnClientAction(GameCommand command)
        {
            switch (command.Name)
            {
                case "server/getMissions":
                    return await Task.Run(
                        () =>
                        {
                            MissionsLibrary.Instance.LoadMissions();
                            return GameCommand.CreateInstance(
                                "server/setMissions",
                                new MissionsPayload(MissionsLibrary.Instance.AvailableMissions)
                            );
                        }
                    );
                case "server/startMission":
                    return await Task.Run(
                        () =>
                        {
                            _stateService.ClearState();

                            _clockService.AddOnTickEventHandler(Game.Instance.OnTick);
                            Game.Instance.RegisterStateRefreshEventHandler(_stateService.SendWorldState);

                            var mission = MissionsLibrary.Instance.InstantiateMission(command.Payload);
                            Game.Instance.Initialize(mission);

                            _clockService.Start();
                            _stateService.SendServerState();

                            return (GameCommand) null;
                        }
                    );
                case "server/pauseMission":
                    return await Task.Run(
                        () =>
                        {
                            _clockService.Stop();
                            _stateService.SendServerState();
                            return (GameCommand) null;
                        }
                    );
            }

            await Game.Instance.EnqueueCommand(command);

            return null;
        }
    }
}
