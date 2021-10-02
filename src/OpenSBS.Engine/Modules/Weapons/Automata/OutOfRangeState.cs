using System;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Modules.Weapons.Automata
{
    public class OutOfRangeState : WeaponState
    {
        public static OutOfRangeState Create()
        {
            return new OutOfRangeState();
        }

        private OutOfRangeState() : base("state.outOfRange") { }

        public override void OnEnter(WeaponModule module)
        {
            module.Timer.Reset(0);
        }

        public override WeaponState Update(TimeSpan deltaT, WeaponModule module, Entity owner, World world)
        {
            if (!WeaponHasTarget(module, world))
            {
                return IdleState.Create();
            }

            return module.IsTargetUnreachable() ? null : FireState.Create();
        }
    }
}
