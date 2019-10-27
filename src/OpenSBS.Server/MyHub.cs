using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OpenSBS.Engine;
using OpenSBS.Engine.Commands;

namespace OpenSBS.Server
{
    public class MyHub : Hub
    {
        private readonly RefreshStateService _refreshStateService;

        public MyHub(RefreshStateService refreshStateService)
        {
            _refreshStateService = refreshStateService;
        }

        public async Task StartScenario()
        {
            await Task.Run(
                () =>
                {
                    GameClock.Instance.RegisterTickEventHandler(Game.Instance.OnTick);
                    Game.Instance.RegisterStateRefreshEventHandler(_refreshStateService.SendRefreshStateCommand);
                    Game.Instance.Initialize(new MyScenario());
                    GameClock.Instance.Start();
                }
            );
        }

        public async Task PauseScenario()
        {
            await Task.Run(() => GameClock.Instance.Stop());
        }

        public async Task UpdateState(UpdateStateCommand command)
        {
            await Game.Instance.EnqueueCommand(command);
        }
    }
}
