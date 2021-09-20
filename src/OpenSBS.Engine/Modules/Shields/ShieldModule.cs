using System;
using OpenSBS.Engine.Models;
using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Modules;
using OpenSBS.Engine.Models.Templates;

namespace OpenSBS.Engine.Modules.Shields
{
    public class ShieldModule : Module<ShieldModuleTemplate>
    {
        private const string ToggleAction = "toggle";
        private const string SetCalibrationAction = "setCalibration";
        private const string ResetCalibrationAction = "resetCalibration";
        private const string ReinforceSideAction = "reinforceSide";
        private readonly CountdownTimer _countdownTimer;

        public bool IsRaised { get; protected set; }
        public ShieldSectorCollection Sectors { get; }
        public int AvailableCalibrationPoints => Sectors.GetAvailableCalibrationPoints();

        public static ShieldModule Create(ShieldModuleTemplate template)
        {
            return new ShieldModule(template);
        }

        private ShieldModule(ShieldModuleTemplate template) : base(ModuleType.Shield, template)
        {
            IsRaised = false;
            Sectors = new ShieldSectorCollection(Template.Capacity, Template.RechargeRate);

            _countdownTimer = new CountdownTimer();
        }

        public override void HandleAction(ClientAction action, Entity owner)
        {
            switch (action.Type)
            {
                case ToggleAction:
                    IsRaised = !IsRaised;
                    if (IsRaised)
                    {
                        _countdownTimer.Reset(1);
                    }

                    break;
                case SetCalibrationAction:
                    Sectors.SetCalibration(action.PayloadTo<CalibrationPayload>());
                    break;
                case ResetCalibrationAction:
                    Sectors.ResetCalibration();
                    break;
                case ReinforceSideAction:
                    Sectors.Reinforce(action.PayloadTo<string>());
                    break;
            }
        }

        public override void Update(TimeSpan deltaT, Entity owner, World world)
        {
            if (!IsRaised)
            {
                return;
            }

            _countdownTimer.Advance(deltaT.TotalSeconds);
            if (!_countdownTimer.IsCompleted)
            {
                return;
            }

            Sectors.Update();
            _countdownTimer.Reset(1);
        }
    }
}
