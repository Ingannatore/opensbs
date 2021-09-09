using System;
using OpenSBS.Engine.Automata;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Modules.Weapons
{
    public abstract class WeaponModule : Module
    {
        public int Damage { get; protected set; }
        public int Range { get; protected set; }
        public int RateOfFire { get; protected set; }
        public string Target { get; set; }
        public Counter Counter { get; }
        public bool IsEngaged => Target != null;
        public string State => _stateMachine.Current.GetName();

        private readonly ModuleStateMachine<WeaponModule, WeaponState> _stateMachine;

        public WeaponModule(string id, string name) : base(id, ModuleType.Weapon, name)
        {
            Counter = new Counter();
            _stateMachine = new ModuleStateMachine<WeaponModule, WeaponState>(this, new IdleWeaponState());
        }

        public override void HandleAction(ClientAction action)
        {
            _stateMachine.HandleAction(action);
        }

        public override void Update(TimeSpan deltaT, Entity owner, World world)
        {
            _stateMachine.Update(deltaT, owner, world);
        }
    }
}
