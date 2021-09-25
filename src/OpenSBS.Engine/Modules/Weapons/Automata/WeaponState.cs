using OpenSBS.Engine.Automata;

namespace OpenSBS.Engine.Modules.Weapons.Automata
{
    public abstract class WeaponState : ModuleState<WeaponModule, WeaponState>
    {
        public string Id { get; }
        protected WeaponState(string id)
        {
            Id = id;
        }

        protected bool WeaponHasTarget(WeaponModule module, World world)
        {
            return module.HasTarget() && world.ExistsEntity(module.Target.Id);
        }
    }
}
