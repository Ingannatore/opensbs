using System;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Modules.Weapons.Automata
{
    public class FireState : WeaponState
    {
        public static FireState Create()
        {
            return new FireState();
        }

        public override string GetName()
        {
            return "Firing";
        }

        public override WeaponState Update(TimeSpan deltaT, WeaponModule module, Entity owner, World world)
        {
            if (!WeaponHasTarget(module, world))
            {
                return IdleState.Create();
            }

            if (module.IsTargetOutOfRange())
            {
                return OutOfRangeState.Create();
            }

            world.DamageEntity(module.Target.Id, module.Template.Damage);

            return CycleState.Create();
        }
    }
}
