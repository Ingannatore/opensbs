using OpenSBS.Core.Utils;
using System.Numerics;

namespace OpenSBS.Core.Components
{
    internal class BodyComponent
    {
        public Vector2 Position { get; protected set; }
        public Vector2 Direction { get; protected set; }
        public double AngularSpeed { get; protected set; }
        public double LinearSpeed { get; protected set; }
        public int Bearing { get; protected set; }

        public BodyComponent(
            Vector2 position,
            Vector2 direction,
            double angularSpeed = 0,
            double linearSpeed = 0
        )
        {
            Position = position;
            Direction = direction;
            AngularSpeed = angularSpeed;
            LinearSpeed = linearSpeed;
        }

        public void Update(TimeSpan deltaT)
        {
            RotateBody(deltaT, AngularSpeed);
            MoveBody(deltaT, LinearSpeed);
        }

        public BodyComponent SetAngularSpeed(double value)
        {
            AngularSpeed = value;
            return this;
        }

        public BodyComponent SetLinearSpeed(double value)
        {
            LinearSpeed = value;
            return this;
        }

        private void RotateBody(TimeSpan deltaT, double rotationSpeed)
        {
            if (rotationSpeed == 0) return;

            Direction = Vectors.Rotate(Direction, (double)Angles.ToRadians(rotationSpeed * deltaT.TotalSeconds));
            Bearing = (int)Math.Round(Angles.ToBearing(Direction));
        }

        private void MoveBody(TimeSpan deltaT, double linearSpeed)
        {
            if (linearSpeed == 0) return;

            Position = Vectors.Move(Position, Direction, (double)(linearSpeed * deltaT.TotalSeconds));
        }
    }
}
