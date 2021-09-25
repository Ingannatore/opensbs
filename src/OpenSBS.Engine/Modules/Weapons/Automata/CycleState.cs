using System;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Modules.Weapons.Automata
{
    public class CycleState : WeaponState
    {
        public static CycleState Create()
        {
            return new CycleState();
        }

        private CycleState() : base("state.fire") { }

        public override void OnEnter(WeaponModule module)
        {
            module.Timer.Reset(module.Template.CycleTime);
        }

        public override WeaponState Update(TimeSpan deltaT, WeaponModule module, Entity owner, World world)
        {
            module.Timer.Advance(deltaT.TotalSeconds);
            return module.Timer.IsCompleted ? FireState.Create() : null;
        }
    }
}
