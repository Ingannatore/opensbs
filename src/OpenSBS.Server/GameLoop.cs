using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using OpenSBS.Engine;
using OpenSBS.Server.Commands;

namespace OpenSBS.Server
{
    public class GameLoop : IHostedService, IDisposable
    {
        private readonly GameState _state;
        private readonly GameCommandsManager _manager;
        private readonly IHubContext<MyHub> _hubContext;
        private readonly ILogger<GameLoop> _logger;
        private readonly Mission _mission;
        private Timer _timer;

        public GameLoop(
            GameState state,
            GameCommandsManager manager,
            IHubContext<MyHub> hubContext,
            ILogger<GameLoop> logger
        )
        {
            _state = state ?? throw new ArgumentNullException(nameof(state));
            _manager = manager ?? throw new ArgumentNullException(nameof(manager));
            _hubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));
            _logger = logger;

            _mission = new Mission(_state);
            _mission.Initialize();
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Starting game loop");
            _timer = new Timer(
                DoWork,
                null,
                TimeSpan.Zero,
                TimeSpan.FromMilliseconds(1000)
            );

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Stopping game loop");
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }

        private void DoWork(object state)
        {
            _manager.ConsumeCommands();
            _mission.Update();
            _hubContext.Clients.All.SendAsync("RefreshState", _state.ToJson());
        }
    }
}
