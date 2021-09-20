using System;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Modules.Weapons.Automata
{
    public class EngageWeaponState : WeaponState
    {
        private bool _hasFired;

        public override string GetName()
        {
            return "Engaged";
        }

        public override void OnEnter(WeaponModule weapon)
        {
            _hasFired = false;
            weapon.Timer.Reset(weapon.Template.CycleTime);
        }

        public override WeaponState Update(WeaponModule weapon, TimeSpan deltaT, Entity owner, World world)
        {
            if (!_hasFired && WeaponHasValidTarget(weapon, world))
            {
                _hasFired = true;
                world.GetEntity(weapon.Target).ApplyDamage(weapon.Template.Damage);
            }

            weapon.Timer.Advance(deltaT.TotalSeconds);
            if (!weapon.Timer.IsCompleted)
            {
                return null;
            }

            if (!WeaponHasValidTarget(weapon, world))
            {
                IsCompleted = true;
                return null;
            }

            _hasFired = false;
            weapon.ResetTimer();

            return null;
        }

        private bool WeaponHasValidTarget(WeaponModule weapon, World world)
        {
            return weapon.HasTarget() && world.ExistsEntity(weapon.Target);
        }
    }
}
