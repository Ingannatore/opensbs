using System;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Modules.Weapons
{
    public class IdleWeaponState : WeaponState
    {
        public override string GetName()
        {
            return "Idle";
        }

        public override void OnEnter(WeaponModule weapon)
        {
            weapon.Counter.Reset(0);
        }

        public override WeaponState HandleAction(WeaponModule weapon, ClientAction action)
        {
            if (action.Type == "engage")
            {
                weapon.Target = action.Payload;
                return new FiringWeaponState();
            }

            return null;
        }

        public override WeaponState Update(WeaponModule weapon, TimeSpan deltaT, Entity owner, World world)
        {
            return null;
        }
    }
}
