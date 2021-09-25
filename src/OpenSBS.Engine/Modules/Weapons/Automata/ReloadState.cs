using System;
using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Items;

namespace OpenSBS.Engine.Modules.Weapons.Automata
{
    public class ReloadState : WeaponState
    {
        private readonly ItemStack _ammo;

        public static ReloadState Create(ItemStack ammo)
        {
            return new ReloadState(ammo);
        }

        private ReloadState(ItemStack ammo) : base("Reloading")
        {
            _ammo = ammo;
        }

        public override void OnEnter(WeaponModule module)
        {
            module.Timer.Reset(module.Template.ReloadTime);
        }

        public override WeaponState Update(TimeSpan deltaT, WeaponModule module, Entity owner, World world)
        {
            module.Timer.Advance(deltaT.TotalSeconds);
            if (!module.Timer.IsCompleted)
            {
                return null;
            }

            var remainingAmmo = module.Reload(_ammo);
            if (remainingAmmo != null)
            {
                owner.Cargo.Add(remainingAmmo);
            }

            return FireState.Create();
        }
    }
}
