﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OpenSBS.Data;
using OpenSBS.Engine;
using OpenSBS.Engine.Messages;

namespace OpenSBS.Services
{
    public class ServerHub : Hub
    {
        private readonly StateService _stateService;

        public ServerHub(StateService stateService)
        {
            _stateService = stateService;
        }

        public async Task<Action> GetMissions()
        {
            return await Task.Run(
                () =>
                {
                    MissionsLibrary.Instance.LoadMissions();
                    return new Action(
                        "SetMissions",
                        MissionsLibrary.Instance.AvailableMissions
                    );
                }
            );
        }

        public async Task StartMission(Message message)
        {
            await Task.Run(
                () =>
                {
                    _stateService.ClearState();
                    var mission = MissionsLibrary.Instance
                        .InstantiateMission(message.Content.ToObject<string>());

                    GameClock.Instance.RegisterTickEventHandler(Game.Instance.OnTick);
                    Game.Instance.RegisterStateRefreshEventHandler(_stateService.SendWorldState);
                    Game.Instance.Initialize(mission);
                    GameClock.Instance.Start();

                    _stateService.SendServerState();
                }
            );
        }

        public async Task PauseMission()
        {
            await Task.Run(
                () =>
                {
                    GameClock.Instance.Stop();
                    _stateService.SendServerState();
                }
            );
        }

        public async Task ModuleMessage(Message message)
        {
            await Game.Instance.EnqueueMessage(message);
        }
    }
}
