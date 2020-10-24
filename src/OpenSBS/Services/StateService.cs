﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using OpenSBS.Engine;
using OpenSBS.Engine.Entities;
using OpenSBS.Engine.Server;
using OpenSBS.Models;

namespace OpenSBS.Services
{
    public class StateService
    {
        private readonly IHubContext<ServerHub> _hubContext;
        private readonly ClockService _clockService;
        private string _lastWorldState;

        public StateService(IHubContext<ServerHub> hubContext, ClockService clockService)
        {
            _hubContext = hubContext;
            _clockService = clockService;
            _lastWorldState = null;
        }

        public void ClearState()
        {
            _lastWorldState = null;
        }

        public void SendWorldState(object sender, ICollection<Entity> entities)
        {
            var worldState = BuildWorldState(entities);
            var state = SerializeState(worldState);
            if (state == _lastWorldState)
            {
                return;
            }

            _hubContext.Clients.All.SendAsync("world/refreshState", state);
            _lastWorldState = state;
        }

        public void SendServerState()
        {
            var serverState = new ServerState(
                Game.Instance.IsReady,
                _clockService.IsRunning
            );
            var state = SerializeState(serverState);

            _hubContext.Clients.All.SendAsync("server/refreshState", state);
        }

        private static WorldState BuildWorldState(ICollection<Entity> entities)
        {
            return new WorldState(entities.First(), entities.Skip(1));
        }

        private static string SerializeState<T>(T state)
        {
            return JsonConvert.SerializeObject(
                state,
                new JsonSerializerSettings
                {
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new CamelCaseNamingStrategy()
                    }
                }
            );
        }
    }
}
