using System;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Modules.Weapons.Automata
{
    public class IdleWeaponState : WeaponState
    {
        public override string GetName()
        {
            return "Idle";
        }

        public override void OnEnter(WeaponModule weapon)
        {
            weapon.Timer.Reset(0);
        }

        public override WeaponState HandleAction(WeaponModule weapon, ClientAction action)
        {
            return null;
        }

        public override WeaponState Update(WeaponModule weapon, TimeSpan deltaT, Entity owner, World world)
        {
            if (weapon.Target != null)
            {
                return new EngageWeaponState();
            }

            return null;
        }
    }
}
