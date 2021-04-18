using System;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Modules.Weapons
{
    public abstract class WeaponModule : Module
    {
        public int Damage { get; protected set; }
        public int Range { get; protected set; }
        public int RateOfFire { get; protected set; }
        public string Target { get; protected set; }
        public bool Engaged { get; protected set; }
        public Counter Counter { get; }
        public WeaponMagazine WeaponMagazine { get; protected set; }

        public WeaponModule(string id, string name) : base(id, ModuleType.Weapon, name)
        {
            Counter = new Counter();
        }

        public override void HandleAction(ClientAction action)
        {
            // TODO: implement
        }

        public override void Update(TimeSpan deltaT, Entity owner, World world)
        {
            // TODO: implement
        }
    }
}
