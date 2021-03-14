using System;
using Microsoft.AspNetCore.SignalR;
using OpenSBS.Engine;

namespace OpenSBS.Services
{
    public class SignalrStateSender
    {
        private readonly IHubContext<SignalrHub> _hubContext;
        private readonly Server _server;

        public SignalrStateSender(IHubContext<SignalrHub> hubContext, Server server)
        {
            _hubContext = hubContext;
            _server = server;
            _server.AddOnAfterTickEventHandler(SendState);
        }

        private async void SendState(object sender, EventArgs eventArgs)
        {
            await _hubContext.Clients.All.SendAsync(
                "OnServerAction",
                _server.CreateServerRefreshAction()
            );
        }
    }
}
