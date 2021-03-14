using System;
using System.Numerics;
using OpenSBS.Engine.Utils;

namespace OpenSBS.Engine.Models
{
    public abstract class SpaceThing : Thing
    {
        public string Description { get; protected set; }
        public Vector3 Position { get; protected set; }
        public Vector3 Direction { get; protected set; }
        public double LinearSpeed { get; set; }
        public double AngularSpeed { get; set; }

        protected SpaceThing(string id, string name) : base(id, name)
        {
            Position = new Vector3(0, 0, 0);
            Direction = new Vector3(0, 0, 0);
        }

        public void MoveTo(float x, float y, float z)
        {
            Position = new Vector3(x, y, z);
        }

        public virtual void Update(TimeSpan deltaT)
        {
            RotateBody(deltaT);
            MoveBody(deltaT);
        }

        private void RotateBody(TimeSpan deltaT)
        {
            var deltaYaw = AngularSpeed * deltaT.TotalSeconds;
            Direction = Vectors.ChangeDirection(Direction, deltaYaw, 0, 0);
        }

        private void MoveBody(TimeSpan deltaT)
        {
            var deltaMovement = LinearSpeed * deltaT.TotalSeconds;
            Position = Vectors.Move(Position, Direction, deltaMovement);
        }
    }
}
