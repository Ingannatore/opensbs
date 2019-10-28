using Microsoft.AspNetCore.SignalR;

namespace OpenSBS.Server
{
    public class RefreshStateService
    {
        private readonly IHubContext<MyHub> _hubContext;

        public RefreshStateService(IHubContext<MyHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public void SendRefreshStateMessage(object sender, string state)
        {
            _hubContext.Clients.All.SendAsync("RefreshState", state);
        }
    }
}
