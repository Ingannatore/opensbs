using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace OpenSBS.Server
{
    public class MyHub : Hub
    {
        private readonly EventsQueue _eventsQueue;
        private readonly ILogger<MyHub> _logger;

        public MyHub(EventsQueue eventsQueue, ILogger<MyHub> logger)
        {
            _eventsQueue = eventsQueue;
            _logger = logger;
        }

        public async Task SetRudder(int value)
        {
            _eventsQueue.AddEvent(new SocketEvent("SET_RUDDER", value));
            _logger.LogInformation($"SetRudder({value})");
        }

        public async Task ResetRudder()
        {
            _eventsQueue.AddEvent(new SocketEvent("RESET_RUDDER"));
            _logger.LogInformation("ResetRudder()");
        }
    }
}
