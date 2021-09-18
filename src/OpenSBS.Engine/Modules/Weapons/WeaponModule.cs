﻿using System;
using OpenSBS.Engine.Automata;
using OpenSBS.Engine.Models;
using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Modules;
using OpenSBS.Engine.Modules.Weapons.Automata;

namespace OpenSBS.Engine.Modules.Weapons
{
    public abstract class WeaponModule : Module
    {
        private const string EngageAction = "engage";
        private const string DisengageAction = "disengage";

        public int Damage { get; protected set; }
        public int Range { get; protected set; }
        public int CycleTime { get; protected set; }
        public string Target { get; protected set; }
        public CountdownTimer Timer { get; }
        public string Status => _stateMachine.Current.GetName();

        private readonly ModuleStateMachine<WeaponModule, WeaponState> _stateMachine;

        public WeaponModule(string id, string name) : base(id, ModuleType.Weapon, name)
        {
            Timer = new CountdownTimer();
            _stateMachine = new ModuleStateMachine<WeaponModule, WeaponState>(this, new IdleWeaponState());
        }

        public bool HasTarget()
        {
            return Target != null;
        }

        public void ResetTimer()
        {
            Timer.Reset(CycleTime);
        }

        public void ResetTarget()
        {
            Target = null;
        }

        public override void HandleAction(ClientAction action)
        {
            if (action.Type == EngageAction)
            {
                Target = action.PayloadTo<string>();
            }

            if (action.Type == DisengageAction)
            {
                Target = null;
            }
        }

        public override void Update(TimeSpan deltaT, Entity owner, World world)
        {
            _stateMachine.Update(deltaT, owner, world);
        }
    }
}