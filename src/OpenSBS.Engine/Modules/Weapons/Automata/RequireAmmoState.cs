using System;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Modules.Weapons.Automata
{
    public class RequireAmmoState : WeaponState
    {
        private readonly string _itemId;
        private int _missingAmmoQuantity;

        public static RequireAmmoState Create(string itemId)
        {
            return new RequireAmmoState(itemId);
        }

        private RequireAmmoState(string itemId) : base("state.reload")
        {
            _itemId = itemId;
        }

        public override void OnEnter(WeaponModule module)
        {
            _missingAmmoQuantity = module.GetMissingAmmoQuantity(_itemId);
        }

        public override WeaponState Update(TimeSpan deltaT, WeaponModule module, Entity owner, World world)
        {
            var ammoStack = owner.Cargo.Extract(_itemId, _missingAmmoQuantity);
            if (ammoStack != null)
            {
                return ReloadState.Create(ammoStack);
            }

            if (module.Magazine.IsEmpty())
            {
                return OutOfAmmoState.Create();
            }

            return IdleState.Create();
        }
    }
}
