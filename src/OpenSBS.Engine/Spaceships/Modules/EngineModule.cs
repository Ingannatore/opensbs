using System;
using OpenSBS.Engine.Commands;

namespace OpenSBS.Engine.Spaceships.Modules
{
    public abstract class EngineModule : Module
    {
        private const string SetThrottleCommand = "setThrottle";
        private const string SetRudderCommand = "setRudder";

        public int Throttle { get; protected set; }
        public int Rudder { get; protected set; }
        public int MaximumSpeed { get; protected set; }
        public int Acceleration { get; protected set; }
        public int Deceleration { get; protected set; }
        public int RotationSpeed { get; protected set; }

        protected EngineModule(string id, string name) : base(id, name)
        {
            Type = ModuleType.Engine;
        }

        public override void HandleCommand(GameCommand command)
        {
            switch (command.Name)
            {
                case SetThrottleCommand:
                    Throttle = command.GetPayload<int>();
                    break;
                case SetRudderCommand:
                    Rudder = command.GetPayload<int>();
                    break;
            }
        }

        public override void Update(TimeSpan deltaT, Spaceship owner)
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

            return rudderDirection * RotationSpeed * deltaT.TotalSeconds * (Math.PI / 180);
        }

        private double CalculateLinearSpeed(TimeSpan deltaT, Spaceship owner)
        {
            var targetSpeed = MaximumSpeed * (Throttle / 100.0);
            var currentLinearSpeed = owner.LinearSpeed;

            var linearSpeedDirection = Math.Sign(targetSpeed - currentLinearSpeed);
            if (linearSpeedDirection < 0)
            {
                var deltaSpeed = Deceleration * deltaT.TotalSeconds;
                return Math.Max(currentLinearSpeed - deltaSpeed, -MaximumSpeed);
            }

            if (linearSpeedDirection > 0)
            {
                var deltaSpeed = Acceleration * deltaT.TotalSeconds;
                return Math.Min(currentLinearSpeed + deltaSpeed, MaximumSpeed);
            }

            return currentLinearSpeed;
        }
    }
}
