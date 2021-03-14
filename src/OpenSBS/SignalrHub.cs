using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OpenSBS.Engine;
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
            await Clients.Caller.SendAsync("OnServerAction", CreateServerRefreshAction());
        }

        public async Task OnClientAction(GameAction action)
        {
            await _server.EnqueueAction(action);
        }

        private async void SendState(object sender, EventArgs eventArgs)
        {
            await Clients.All.SendAsync("OnServerAction", CreateServerRefreshAction());
        }

        private GameAction CreateServerRefreshAction()
        {
            return new GameAction("server/refresh", _server.State);
        }
    }
}
