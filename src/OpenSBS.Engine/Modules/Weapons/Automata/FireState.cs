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

        private FireState() : base("Firing") { }

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

            if (module.IsMagazineEmpty())
            {
                return RequireAmmoState.Create(module.Magazine.AmmoId);
            }

            module.ConsumeAmmo();
            world.DamageEntity(module.Target.Id, module.Template.Damage);

            return CycleState.Create();
        }
    }
}
