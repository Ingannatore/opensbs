using System;
using OpenSBS.Engine.Models;

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

        public override WeaponState HandleAction(WeaponModule weapon, ClientAction action)
        {
            return null;
        }

        public override WeaponState Update(WeaponModule weapon, TimeSpan deltaT, Entity owner, World world)
        {
            weapon.Timer.Advance(deltaT.TotalSeconds);
            if (!weapon.Timer.IsCompleted)
            {
                return null;
            }

            if (weapon.Target == null)
            {
                IsCompleted = true;
                return null;
            }

            // TODO: Danneggia il target
            weapon.Timer.Reset(weapon.CycleTime);

            return null;
        }
    }
}
