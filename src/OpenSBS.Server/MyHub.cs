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

        public async Task UpdateState(UpdateStateEvent updateStateEvent)
        {
            _eventsQueue.AddEvent(updateStateEvent);
            _logger.LogInformation($"UpdateState({updateStateEvent.Key}): {updateStateEvent.Value}");            
        }
    }
}
