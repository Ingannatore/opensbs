using System;
using OpenSBS.Engine.Automata;
using OpenSBS.Engine.Models;
using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Items;
using OpenSBS.Engine.Models.Modules;
using OpenSBS.Engine.Models.Templates;
using OpenSBS.Engine.Modules.Sensors;
using OpenSBS.Engine.Modules.Weapons.Automata;

namespace OpenSBS.Engine.Modules.Weapons
{
    public class WeaponModule : Module<WeaponModuleTemplate>
    {
        private const string EngageAction = "engage";
        private const string DisengageAction = "disengage";
        private const string ReloadAction = "reload";
        private const string UnloadAction = "unload";
        private readonly ModuleStateMachine<WeaponModule, WeaponState> _stateMachine;

        public EntityTrace Target { get; private set; }
        public WeaponMagazine Magazine { get; }
        public CountdownTimer Timer { get; }
        public string Status => _stateMachine.State.Id;

        public static WeaponModule Create(WeaponModuleTemplate template)
        {
            return new WeaponModule(template);
        }

        private WeaponModule(WeaponModuleTemplate template) : base(ModuleType.Weapon, template)
        {
            Magazine = new WeaponMagazine(template.AmmoType, template.MagazineSize);
            Timer = new CountdownTimer();

            _stateMachine = new ModuleStateMachine<WeaponModule, WeaponState>(this, IdleState.Create());
        }

        public bool HasTarget()
        {
            return Target != null;
        }

        public bool IsTargetOutOfRange()
        {
            return Target?.IsOutOfRange(Template.Range) ?? false;
        }

        public bool IsMagazineEmpty()
        {
            return Magazine.IsEmpty();
        }

        public ItemStack Reload(ItemStack ammo)
        {
            return Magazine.Reload(ammo);
        }

        public void ConsumeAmmo()
        {
            Magazine.Consume(Template.AmmoPerCycle);
        }

        public int GetMissingAmmoQuantity(string ammoId)
        {
            return Magazine.AmmoId == ammoId ? Template.MagazineSize - Magazine.Quantity : Template.MagazineSize;
        }

        public void ResetTimer()
        {
            Timer.Reset(Template.CycleTime);
        }

        public void ResetTarget()
        {
            Target = null;
        }

        public override void HandleAction(ClientAction action, Entity owner)
        {
            switch (action.Type)
            {
                case EngageAction:
                {
                    var targetId = action.PayloadTo<string>();
                    Target = owner.Modules.First<SensorsModule>().GetTrace(targetId);
                    break;
                }

                case DisengageAction:
                {
                    Target = null;
                    break;
                }

                case ReloadAction:
                {
                    if (!HasTarget())
                    {
                        var ammoId = action.PayloadTo<string>();
                        _stateMachine.SetState(this, RequireAmmoState.Create(ammoId));
                    }

                    break;
                }

                case UnloadAction:
                {
                    if (!HasTarget())
                    {
                        _stateMachine.SetState(this, UnloadState.Create());
                    }

                    break;
                }
            }
        }

        public override void Update(TimeSpan deltaT, Entity owner, World world)
        {
            _stateMachine.Update(deltaT, this, owner, world);
        }
    }
}
