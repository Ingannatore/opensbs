using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OpenSBS.Engine;
using OpenSBS.Engine.Commands;
using OpenSBS.Engine.Models;

namespace OpenSBS
{
    public class SignalrHub : Hub
    {
        private readonly Server _server;

        public SignalrHub()
        {
            _server = new Server();
            _server.AddOnAfterTickEventHandler(SendState);
        }

        public async Task OnAfterConnect()
        {
            await Clients.Caller.SendAsync("OnClientAction", CreateServerRefreshAction());
        }

        public async Task OnClientCommand(GameCommand command)
        {
            await _server.EnqueueIncomingCommand(command);
        }

        private async void SendState(object sender, EventArgs eventArgs)
        {
            await Clients.All.SendAsync("OnClientAction", CreateServerRefreshAction());
        }

        private ClientAction CreateServerRefreshAction()
        {
            return new ClientAction("server/refresh", _server.State);
        }
    }
}
