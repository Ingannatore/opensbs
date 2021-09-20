using System;
using OpenSBS.Engine.Models;
using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Modules;
using OpenSBS.Engine.Models.Templates;

namespace OpenSBS.Engine.Modules.Engines
{
    public class EngineModule : Module<EngineModuleTemplate>
    {
        private const string SetThrottleAction = "setThrottle";
        private const string SetRudderAction = "setRudder";

        public int Throttle { get; protected set; }
        public int Rudder { get; protected set; }
        public double TargetSpeed { get; protected set; }

        public static EngineModule Create(EngineModuleTemplate template)
        {
            return new EngineModule(template);
        }

        private EngineModule(EngineModuleTemplate template) : base(ModuleType.Engine, template) { }

        public override void HandleAction(ClientAction action)
        {
            switch (action.Type)
            {
                case SetThrottleAction:
                    Throttle = action.PayloadTo<int>();
                    break;
                case SetRudderAction:
                    Rudder = action.PayloadTo<int>();
                    break;
            }
        }

        public override void Update(TimeSpan deltaT, Entity owner, World world)
        {
            owner.AngularSpeed = CalculateAngularSpeed(deltaT);
            owner.LinearSpeed = CalculateLinearSpeed(deltaT, owner);
        }

        private double CalculateAngularSpeed(TimeSpan deltaT)
        {
            var rudderDirection = Math.Sign(Rudder);
            if (rudderDirection == 0)
            {
                return 0;
            }

            return rudderDirection * Template.RotationSpeed * deltaT.TotalSeconds;
        }

        private double CalculateLinearSpeed(TimeSpan deltaT, Entity owner)
        {
            TargetSpeed = Template.MaximumSpeed * (Throttle / 100.0);
            var currentLinearSpeed = owner.LinearSpeed;
            var linearSpeedDirection = Math.Sign(TargetSpeed - currentLinearSpeed);

            if (linearSpeedDirection > 0)
            {
                var deltaSpeed = Template.Acceleration * deltaT.TotalSeconds;
                return Math.Min(currentLinearSpeed + deltaSpeed, TargetSpeed);
            }

            if (linearSpeedDirection < 0)
            {
                var deltaSpeed = Template.Deceleration * deltaT.TotalSeconds;
                return Math.Max(currentLinearSpeed - deltaSpeed, TargetSpeed);
            }

            return currentLinearSpeed;
        }
    }
}
