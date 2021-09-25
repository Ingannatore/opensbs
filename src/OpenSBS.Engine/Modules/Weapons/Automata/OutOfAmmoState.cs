using System;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Modules.Weapons.Automata
{
    public class OutOfAmmoState : WeaponState
    {
        public static OutOfAmmoState Create()
        {
            return new OutOfAmmoState();
        }

        private OutOfAmmoState() : base("state.outOfAmmo") { }

        public override WeaponState Update(TimeSpan deltaT, WeaponModule module, Entity owner, World world)
        {
            return null;
        }
    }
}
