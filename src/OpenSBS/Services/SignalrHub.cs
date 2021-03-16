using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OpenSBS.Engine;
using OpenSBS.Engine.Models;

namespace OpenSBS.Services
{
    public class SignalrHub : Hub
    {
        private readonly Server _server;

        public SignalrHub(Server server)
        {
            _server = server;
        }

        public async Task OnAfterConnect()
        {
            await Clients.Caller.SendAsync(
                "OnServerAction",
                new GameAction("server/refresh", _server.State)
            );
        }

        public async Task OnClientAction(GameAction action)
        {
            await Task.Run(() => _server.HandleAction(action));
        }
    }
}
