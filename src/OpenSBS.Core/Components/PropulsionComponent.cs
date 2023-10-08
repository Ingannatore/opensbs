using OpenSBS.Core.Models;
using System.Numerics;

namespace OpenSBS.Core.Components
{
    internal abstract class PropulsionComponent
    {
        private const string ThrottleAction = "throttle";
        private const string RudderAction = "rudder";
        private const string AlignAction = "align";
        private const string AutopilotAction = "autopilot";

        public int Acceleration { get; }
        public int Deceleration { get; }
        public double MaximumLinearSpeed { get; }
        public double MaximumAngularSpeed { get; }
        public int Throttle { get; private set; }
        public int Rudder { get; private set; }
        public int? TargetBearing { get; private set; }
        public Vector2? TargetLocation { get; private set; }

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
                    Throttle = Math.Clamp(command.PayloadTo<int>(), -100, 100);
                    TargetBearing = null;
                    TargetLocation = null;
                    break;

                case RudderAction:
                    Rudder = Math.Clamp(command.PayloadTo<int>(), -100, 100);
                    TargetBearing = null;
                    TargetLocation = null;
                    break;

                case AlignAction:
                    var value = command.PayloadTo<int?>();
                    TargetBearing = value != null ? Math.Clamp(value.Value, 0, 359) : null;
                    TargetLocation = null;
                    break;

                case AutopilotAction:
                    TargetLocation = command.PayloadTo<Vector2?>();
                    TargetBearing = null;
                    break;
            }
        }

        public void Update(TimeSpan deltaT, Entity owner)
        {
            if (TargetLocation != null)
            {
                var bearingToTarget = owner.GetBearingTo(TargetLocation.Value);
                if (owner.Body.Bearing != bearingToTarget)
                {
                    TargetBearing = bearingToTarget;
                }

                var distanceToTarget = owner.GetDistanceTo(TargetLocation.Value);
                if (distanceToTarget > 2000)
                {
                    Throttle = CalculateAutopilotThrottle(owner.Body.LinearSpeed, distanceToTarget);
                }
                else
                {
                    Throttle = 0;
                    TargetBearing = null;
                    TargetLocation = null;
                }
            }

            if (TargetBearing != null)
            {
                AlignToBearing(owner.Body.Bearing, TargetBearing.Value);
            }

            owner.Body
                .SetLinearSpeed(CalculateNextLinearSpeed(deltaT, owner.Body.LinearSpeed))
                .SetAngularSpeed(CalculateNextAngularSpeed(deltaT));
        }

        private void AlignToBearing(int current, int target)
        {
            if (current != target)
            {
                Rudder = 100 * Math.Sign(180 - target - current);
            }
            else
            {
                TargetBearing = null;
            }
        }

        private int CalculateAutopilotThrottle(double linearSpeed, float distanceToTarget)
        {
            var stoppingDistance = Math.Pow(linearSpeed, 2) / (2 * Deceleration);
            return distanceToTarget > stoppingDistance ? 100 : 0;
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
