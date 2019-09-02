using System;
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
            _state.SetValue("ship.bearing", 0.0);
            _state.SetValue("ship.rudder", 0);
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
            SendState();
        }

        private void ConsumeEvents()
        {
            while (_eventsQueue.HasEvents)
            {
                var nextEvent = _eventsQueue.ReadEvent();
                _logger.LogInformation($"Consuming event of type '{nextEvent.Type}'");

                switch (nextEvent.Type)
                {
                    case "SET_RUDDER":
                        var nextRudder = _state.GetValue<int>("ship.rudder") + nextEvent.GetValue<int>();
                        _state.SetValue("ship.rudder", nextRudder);
                        break;
                    case "RESET_RUDDER":
                        _state.SetValue("ship.rudder", 0);
                        break;
                }
            }
        }

        private void UpdateState()
        {
            var currentRudder = _state.GetValue<int>("ship.rudder");
            if (currentRudder == 0)
            {
                return;
            }

            var currentBearing = _state.GetValue<double>("ship.bearing");
            var nextBearing = currentBearing + Math.Sign(currentRudder);
            if (nextBearing < 0)
            {
                nextBearing += 360;
            }
            if (nextBearing >= 360)
            {
                nextBearing -= 360;
            }

            _state.SetValue("ship.bearing", Math.Round(nextBearing, 2));
        }

        private void SendState()
        {
            var stateJson = _state.ToJSON();
            _logger.LogInformation($"Sending state: {stateJson}");
            _hubContext.Clients.All.SendAsync("UpdateState", stateJson);
        }
    }
}
