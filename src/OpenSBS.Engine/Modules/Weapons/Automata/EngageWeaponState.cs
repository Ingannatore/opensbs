using System;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Modules.Weapons.Automata
{
    public class EngageWeaponState : WeaponState
    {
        public override string GetName()
        {
            return "Engaged";
        }

        public override void OnEnter(WeaponModule weapon)
        {
            weapon.Timer.Reset(weapon.CycleTime);
        }

        public override WeaponState Update(WeaponModule weapon, TimeSpan deltaT, Entity owner, World world)
        {
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

            weapon.ResetTimer();
            world.GetEntity(weapon.Target).ApplyDamage(weapon.Damage);

            return null;
        }

        private bool WeaponHasValidTarget(WeaponModule weapon, World world)
        {
            return weapon.HasTarget() && world.ExistsEntity(weapon.Target);
        }
    }
}
