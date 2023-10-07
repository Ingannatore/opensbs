using OpenSBS.Core.Models;

namespace OpenSBS.Core.Components
{
    internal abstract class PropulsionComponent
    {
        private const string ThrottleAction = "throttle";
        private const string RudderAction = "rudder";

        public int Acceleration { get; }
        public int Deceleration { get; }
        public double MaximumLinearSpeed { get; }
        public double MaximumAngularSpeed { get; }
        public int Throttle { get; protected set; }
        public int Rudder { get; protected set; }

        protected PropulsionComponent(int acceleration, int deceleration, int maximumLinearSpeed, int maximumAngularSpeed)
        {
            Acceleration = acceleration;
            Deceleration = deceleration;
            MaximumLinearSpeed = maximumLinearSpeed;
            MaximumAngularSpeed = maximumAngularSpeed;
        }

        public void HandleCommand(ComponentCommand command)
        {
            switch (command.Action)
            {
                case ThrottleAction:
                    Throttle = Math.Clamp(command.PayloadTo<int>(), -100, 100); break;

                case RudderAction:
                    Rudder = Math.Clamp(command.PayloadTo<int>(), -100, 100); break;
            }
        }

        public void Update(TimeSpan deltaT, Entity owner)
        {
            owner.Body.SetLinearSpeed(CalculateNextLinearSpeed(deltaT, owner.Body.LinearSpeed));
            owner.Body.SetAngularSpeed(CalculateNextAngularSpeed(deltaT));
        }

        private double CalculateNextLinearSpeed(TimeSpan deltaT, double linearSpeed)
        {
            var targetSpeed = MaximumLinearSpeed * (Throttle / 100.0);
            var linearSpeedDirection = Math.Sign(targetSpeed - linearSpeed);

            if (linearSpeedDirection > 0)
            {
                var deltaSpeed = Acceleration * deltaT.TotalSeconds;
                return Math.Min(linearSpeed + deltaSpeed, targetSpeed);
            }

            if (linearSpeedDirection < 0)
            {
                var deltaSpeed = Deceleration * deltaT.TotalSeconds;
                return Math.Max(linearSpeed - deltaSpeed, targetSpeed);
            }

            return linearSpeed;
        }

        private double CalculateNextAngularSpeed(TimeSpan deltaT) =>
            MaximumAngularSpeed * deltaT.TotalSeconds * (Rudder / 100.0);
    }
}
