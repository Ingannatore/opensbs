using System;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Modules
{
    public abstract class EngineModule : Module
    {
        private const string SetThrottleAction = "setThrottle";
        private const string SetRudderAction = "setRudder";

        public int Throttle { get; protected set; }
        public int Rudder { get; protected set; }
        public int MaximumSpeed { get; protected set; }
        public int Acceleration { get; protected set; }
        public int Deceleration { get; protected set; }
        public int RotationSpeed { get; protected set; }

        protected EngineModule(string id, string name) : base(id, ModuleType.Engine, name) { }

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

            return rudderDirection * RotationSpeed * deltaT.TotalSeconds;
        }

        private double CalculateLinearSpeed(TimeSpan deltaT, Entity owner)
        {
            var targetSpeed = MaximumSpeed * (Throttle / 100.0);
            var currentLinearSpeed = owner.LinearSpeed;
            var linearSpeedDirection = Math.Sign(targetSpeed - currentLinearSpeed);

            if (linearSpeedDirection > 0)
            {
                var deltaSpeed = Acceleration * deltaT.TotalSeconds;
                return Math.Min(currentLinearSpeed + deltaSpeed, targetSpeed);
            }

            if (linearSpeedDirection < 0)
            {
                var deltaSpeed = Deceleration * deltaT.TotalSeconds;
                return Math.Max(currentLinearSpeed - deltaSpeed, targetSpeed);
            }

            return currentLinearSpeed;
        }
    }
}
