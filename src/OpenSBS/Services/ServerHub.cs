using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OpenSBS.Data;
using OpenSBS.Engine;
using OpenSBS.Engine.Messages;

namespace OpenSBS.Services
{
    public class ServerHub : Hub
    {
        private readonly StateService _stateService;

        public ServerHub(StateService stateService)
        {
            _stateService = stateService;
        }

        public async Task<MessageResponse> GetScenarios()
        {
            return await Task.Run(
                () =>
                {
                    ScenariosLibrary.Instance.LoadScenarios();
                    return new MessageResponse(
                        "GET_SCENARIOS_RESPONSE",
                        ScenariosLibrary.Instance.AvailableScenarios
                    );
                }
            );
        }

        public async Task StartScenario(Message message)
        {
            await Task.Run(
                () =>
                {
                    _stateService.ClearState();
                    var scenario = ScenariosLibrary.Instance
                        .InstantiateScenario(message.Payload.ToObject<string>());

                    GameClock.Instance.RegisterTickEventHandler(Game.Instance.OnTick);
                    Game.Instance.RegisterStateRefreshEventHandler(_stateService.SendWorldState);
                    Game.Instance.Initialize(scenario);
                    GameClock.Instance.Start();

                    _stateService.SendServerState();
                }
            );
        }

        public async Task PauseScenario()
        {
            await Task.Run(
                () =>
                {
                    GameClock.Instance.Stop();
                    _stateService.SendServerState();
                }
            );
        }

        public async Task ModuleMessage(Message message)
        {
            await Game.Instance.EnqueueMessage(message);
        }
    }
}
