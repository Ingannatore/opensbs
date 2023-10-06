using OpenSBS.Core.Utils;

namespace OpenSBS.Core.Components.Propulsion
{
    internal abstract class PropulsionComponent : Component
    {
        private const string ThrottleAction = "throttle";
        private const string RudderAction = "rudder";

        public int Acceleration { get; private set; }
        public int Deceleration { get; private set; }
        public ValueBag LinearSpeed { get; private set; }
        public ValueBag RotationSpeed { get; private set; }
        public int Throttle { get; protected set; }
        public int Rudder { get; protected set; }

        protected PropulsionComponent(int acceleration, int deceleration, int maximumLinearSpeed, int maximumRotationSpeed)
        {
            Acceleration = acceleration;
            Deceleration = deceleration;
            LinearSpeed = new(0, maximumLinearSpeed);
            RotationSpeed = new(0, maximumRotationSpeed);
        }

        public override void HandleCommand(ComponentCommand command)
        {
            switch (command.Action)
            {
                case ThrottleAction:
                    Throttle = Math.Clamp(command.PayloadTo<int>(), 0, 100); break;

                case RudderAction:
                    Rudder = Math.Clamp(command.PayloadTo<int>(), 0, 100); break;
            }
        }

        public override void Update(TimeSpan deltaT)
        {
            LinearSpeed.Set(CalculateNextLinearSpeed(deltaT));
            RotationSpeed.Set(CalculateNextRotationSpeed(deltaT));
        }

        private double CalculateNextLinearSpeed(TimeSpan deltaT)
        {
            var targetSpeed = LinearSpeed.Maximum * (Throttle / 100.0);
            var linearSpeedDirection = Math.Sign(targetSpeed - LinearSpeed.Current);

            if (linearSpeedDirection > 0)
            {
                var deltaSpeed = Acceleration * deltaT.TotalSeconds;
                return Math.Min(LinearSpeed.Current + deltaSpeed, targetSpeed);
            }

            if (linearSpeedDirection < 0)
            {
                var deltaSpeed = Deceleration * deltaT.TotalSeconds;
                return Math.Max(LinearSpeed.Current - deltaSpeed, targetSpeed);
            }

            return LinearSpeed.Current;
        }

        private double CalculateNextRotationSpeed(TimeSpan deltaT) =>
            RotationSpeed.Maximum * deltaT.TotalSeconds * (Rudder / 100.0);
    }
}
