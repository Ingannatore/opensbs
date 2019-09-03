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

        public async Task SetState(string key, string value)
        {
            _eventsQueue.AddEvent(new SetStateEvent(key, value));
            _logger.LogInformation($"SetState({key}): {value}");            
        }
    }
}
