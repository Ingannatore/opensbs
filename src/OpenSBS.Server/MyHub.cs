using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OpenSBS.Server.Commands;

namespace OpenSBS.Server
{
    public class MyHub : Hub
    {
        private readonly GameCommandsManager _manager;

        public MyHub(GameCommandsManager manager)
        {
            _manager = manager;
        }

        public async Task UpdateState(UpdateStateCommand command)
        {
            await _manager.EnqueueCommand(command);
        }
    }
}
