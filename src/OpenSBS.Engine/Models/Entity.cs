using System;
using System.Numerics;
using OpenSBS.Engine.Modules;
using OpenSBS.Engine.Modules.Storage;
using OpenSBS.Engine.Utils;

namespace OpenSBS.Engine.Models
{
    public abstract class Entity : Item
    {
        public string CallSign { get; }
        public int Size { get; protected set; }
        public Vector3 Position { get; protected set; }
        public Vector3 Direction { get; protected set; }
        public double LinearSpeed { get; set; }
        public double AngularSpeed { get; set; }
        public ModulesCollection Modules { get; }

        public Entity(string id, string type, string name, string callSign) : base(id, type, name)
        {
            CallSign = callSign;
            Position = Vector3.Zero;
            Direction = Vector3.UnitX;
            Modules = new ModulesCollection();
        }

        public void HandleAction(ClientAction action)
        {
            if (!string.IsNullOrEmpty(action.Meta.Module))
            {
                Modules.Get(action.Meta.Module).HandleAction(action);
            }
        }

        public void Update(TimeSpan deltaT, World world)
        {
            RotateBody(deltaT);
            MoveBody(deltaT);
            Modules.Update(deltaT, this, world);
        }

        public void MoveTo(float x, float y, float z)
        {
            Position = new Vector3(x, y, z);
        }

        public void AddToStorage(Item item, int quantity)
        {
            Modules.First<StorageModule>().Add(item, quantity);
        }

        private void RotateBody(TimeSpan deltaT)
        {
            if (AngularSpeed == 0)
            {
                return;
            }

            var deltaYaw = Angles.ToRadians(AngularSpeed * deltaT.TotalSeconds);
            Direction = Vectors.Rotate(Direction, deltaYaw, 0, 0);
        }

        private void MoveBody(TimeSpan deltaT)
        {
            if (LinearSpeed == 0)
            {
                return;
            }

            var deltaMovement = LinearSpeed * deltaT.TotalSeconds;
            Position = Vectors.Move(Position, Direction, deltaMovement);
        }
    }
}
