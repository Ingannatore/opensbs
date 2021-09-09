using System;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Modules.Weapons
{
    public class FiringWeaponState : WeaponState
    {
        public override string GetName()
        {
            return "Firing";
        }

        public override void OnEnter(WeaponModule weapon)
        {
            weapon.Counter.Reset(weapon.RateOfFire);
        }

        public override WeaponState HandleAction(WeaponModule weapon, ClientAction action)
        {
            if (action.Type == "disengage")
            {
                weapon.Target = null;
            }

            return null;
        }

        public override WeaponState Update(WeaponModule weapon, TimeSpan deltaT, Entity owner, World world)
        {
            weapon.Counter.Increment(deltaT.TotalSeconds);
            if (!weapon.Counter.IsCompleted)
            {
                return null;
            }

            weapon.Counter.Reset(weapon.RateOfFire);
            if (weapon.Target == null)
            {
                IsCompleted = true;
            }
            else
            {
                // TODO: Damage target
            }

            return null;
        }
    }
}
