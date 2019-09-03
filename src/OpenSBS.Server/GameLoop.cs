using System;
using System.Globalization;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace OpenSBS.Server
{
    public class GameLoop : IHostedService, IDisposable
    {
        private readonly EventsQueue _eventsQueue;
        private readonly IHubContext<MyHub> _hubContext;
        private readonly ILogger<GameLoop> _logger;
        private readonly GameState _state;
        private Timer _timer;

        public GameLoop(EventsQueue eventsQueue, IHubContext<MyHub> hubContext, ILogger<GameLoop> logger)
        {
            _eventsQueue = eventsQueue;
            _hubContext = hubContext;
            _logger = logger;

            _state = new GameState();
            _state.SetValue("ship.bearing", "0");
            _state.SetValue("ship.rudder", "0");
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
            ConsumeEvents();
            UpdateState();
            SendRefreshStateMessage();
        }

        private void ConsumeEvents()
        {
            while (_eventsQueue.HasEvents)
            {
                var nextEvent = _eventsQueue.ReadEvent();
                _logger.LogInformation($"Consuming event of type '{nextEvent.Key}'");
                _state.SetValue(nextEvent.Key, nextEvent.Value);
            }
        }

        private void UpdateState()
        {
            var currentRudder = _state.GetIntValue("ship.rudder");
            if (currentRudder == 0)
            {
                return;
            }

            var currentBearing = _state.GetDoubleValue("ship.bearing");
            var nextBearing = currentBearing + Math.Sign(currentRudder);
            if (nextBearing < 0)
            {
                nextBearing += 360;
            }
            if (nextBearing >= 360)
            {
                nextBearing -= 360;
            }

            _state.SetValue("ship.bearing", Math.Round(nextBearing, 2).ToString(CultureInfo.InvariantCulture));
        }

        private void SendRefreshStateMessage()
        {
            _hubContext.Clients.All.SendAsync("RefreshState", _state.ToJSON());
        }
    }
}
