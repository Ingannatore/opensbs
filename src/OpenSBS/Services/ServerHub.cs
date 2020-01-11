using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OpenSBS.Data.Scenarios;
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

        public async Task StartScenario()
        {
            await Task.Run(
                () =>
                {
                    _stateService.ClearState();

                    GameClock.Instance.RegisterTickEventHandler(Game.Instance.OnTick);
                    Game.Instance.RegisterStateRefreshEventHandler(_stateService.SendWorldState);
                    Game.Instance.Initialize(new MyScenario());
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

        public async Task UpdateState(Message message)
        {
            await Game.Instance.EnqueueMessage(message);
        }

        public async Task ModuleMessage(Message message)
        {
            await Game.Instance.EnqueueMessage(message);
        }
    }
}
