using Microsoft.AspNetCore.SignalR;

namespace OpenSBS.Server
{
    public class RefreshStateService
    {
        private readonly IHubContext<MyHub> _hubContext;
        private string _lastSentState;

        public RefreshStateService(IHubContext<MyHub> hubContext)
        {
            _hubContext = hubContext;
            _lastSentState = null;
        }

        public void ClearState()
        {
            _lastSentState = null;
        }

        public void SendRefreshStateMessage(object sender, string state)
        {
            if (state == _lastSentState)
            {
                return;
            }

            _hubContext.Clients.All.SendAsync("RefreshState", state);
            _lastSentState = state;
        }
    }
}
