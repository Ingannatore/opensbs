using System.Collections.Generic;
using Microsoft.AspNetCore.SignalR;
using OpenSBS.Engine;
using OpenSBS.Engine.Models;

namespace OpenSBS.Services
{
    public class SignalrStateSender : IStateSender
    {
        private readonly IHubContext<SignalrHub> _hubContext;
        private readonly IDictionary<string, string> _previousStates;

        public SignalrStateSender(IHubContext<SignalrHub> hubContext)
        {
            _hubContext = hubContext;
            _previousStates = new Dictionary<string, string>();
        }

        public void Send(ClientAction action)
        {
            _hubContext
                .Clients.All
                .SendAsync("OnServerAction", action)
                .Wait();
        }

        private bool IsStateUnchanged(ClientAction action)
        {
            if (!_previousStates.ContainsKey(action.Type))
            {
                _previousStates.Add(action.Type, action.Payload);
                return false;
            }

            if (_previousStates[action.Type] != action.Payload)
            {
                _previousStates[action.Type] = action.Payload;
                return false;
            }

            return true;
        }
    }
}
