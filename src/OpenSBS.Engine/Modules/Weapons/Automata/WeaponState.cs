﻿using OpenSBS.Engine.Automata;

namespace OpenSBS.Engine.Modules.Weapons.Automata
{
    public abstract class WeaponState : ModuleState<WeaponModule, WeaponState>
    {
        protected bool WeaponHasTarget(WeaponModule module, World world)
        {
            return module.HasTarget() && world.ExistsEntity(module.Target.Id);
        }
    }
}
