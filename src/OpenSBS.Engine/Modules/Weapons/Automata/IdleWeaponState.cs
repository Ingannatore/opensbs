using System;
using OpenSBS.Engine.Models.Entities;

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
            weapon.ResetTarget();
            weapon.Timer.Reset(0);
        }

        public override WeaponState Update(WeaponModule weapon, TimeSpan deltaT, Entity owner, World world)
        {
            return weapon.HasTarget() ? new EngageWeaponState() : null;
        }
    }
}
