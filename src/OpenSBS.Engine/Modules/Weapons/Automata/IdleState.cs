using System;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Modules.Weapons.Automata
{
    public class IdleState : WeaponState
    {
        public static IdleState Create()
        {
            return new IdleState();
        }

        private IdleState() : base("state.idle") { }

        public override void OnEnter(WeaponModule module)
        {
            module.ResetTarget();
            module.Timer.Reset(0);
        }

        public override WeaponState Update(TimeSpan deltaT, WeaponModule module, Entity owner, World world)
        {
            return WeaponHasTarget(module, world) ? FireState.Create() : null;
        }
    }
}
