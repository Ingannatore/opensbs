using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using OpenSBS.Engine.Entities;

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

        public void SendRefreshStateMessage(object sender, ICollection<Entity> entities)
        {
            var state = JsonConvert.SerializeObject(
                new RefreshStateMessage(entities.First(), entities.Skip(1), ""),
                new JsonSerializerSettings
                {
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new CamelCaseNamingStrategy()
                    }
                }
            );

            if (state == _lastSentState)
            {
                return;
            }

            _hubContext.Clients.All.SendAsync("RefreshState", state);
            _lastSentState = state;
        }
    }
}
