using System;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Modules.Shields
{
    public abstract class ShieldModule : Module
    {
        private const string ToggleAction = "toggle";
        private const string SetCalibrationAction = "setCalibration";
        private const string ResetCalibrationAction = "resetCalibration";
        private const string ReinforceSideAction = "reinforceSide";

        public bool IsRaised { get; protected set; }
        public int BaseCapacity { get; protected set; }
        public int BaseRechargeRate { get; protected set; }
        public ShieldSectorCollection Sectors { get; }
        public int AvailableCalibrationPoints => Sectors.GetAvailableCalibrationPoints();

        private readonly Counter _counter;

        protected ShieldModule(string id, string name) : base(id, ModuleType.Shield, name)
        {
            IsRaised = false;
            Sectors = new ShieldSectorCollection();

            _counter = new Counter();
        }

        public override void HandleAction(ClientAction action)
        {
            switch (action.Type)
            {
                case ToggleAction:
                    IsRaised = !IsRaised;
                    if (IsRaised)
                    {
                        _counter.Reset(1);
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
            if (Sectors.IsEmpty())
            {
                Sectors.Initialize(BaseCapacity, BaseRechargeRate);
            }

            if (!IsRaised)
            {
                return;
            }

            _counter.Increment(deltaT.TotalSeconds);
            if (!_counter.IsCompleted)
            {
                return;
            }

            Sectors.Update();
            _counter.Reset(1);
        }
    }
}
