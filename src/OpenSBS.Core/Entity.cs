using OpenSBS.Core.Utils;
using System.Numerics;

namespace OpenSBS.Core
{
    internal abstract class Entity
    {
        public Vector3 Position { get; protected set; }
        public Vector3 Direction { get; protected set; }

        protected Entity(Vector3 position, Vector3 direction)
        {
            Position = position;
            Direction = direction;
        }

        protected void UpdateBody(TimeSpan deltaT, double rotationSpeed, double linearSpeed)
        {
            RotateBody(deltaT, rotationSpeed);
            MoveBody(deltaT, linearSpeed);
        }

        private void RotateBody(TimeSpan deltaT, double rotationSpeed)
        {
            if (rotationSpeed == 0) return;

            Direction = Vectors.Rotate(Direction, (double)Angles.ToRadians(rotationSpeed * deltaT.TotalSeconds), 0, 0);
        }

        private void MoveBody(TimeSpan deltaT, double linearSpeed)
        {
            if (linearSpeed == 0) return;

            Position = Vectors.Move(Position, Direction, (double)(linearSpeed * deltaT.TotalSeconds));
        }
    }
}
