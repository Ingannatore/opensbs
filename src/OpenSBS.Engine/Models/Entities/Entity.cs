using System;
using System.Numerics;
using OpenSBS.Engine.Models.Items;
using OpenSBS.Engine.Models.Modules;
using OpenSBS.Engine.Models.Templates;
using OpenSBS.Engine.Utils;

namespace OpenSBS.Engine.Models.Entities
{
    public abstract class Entity : Item
    {
        public string CallSign { get; }
        public int Size { get; }
        public Vector3 Position { get; private set; }
        public Vector3 Direction { get; private set; }
        public double Bearing { get; private set; }
        public double LinearSpeed { get; private set; }
        public EntityHull Hull { get; }
        public ItemStorage Cargo { get; }
        public ModulesCollection Modules { get; }

        private double _angularSpeed;

        public Entity(string id, string name, string callsign, EntityTemplate template) : base(id, template.Type, name)
        {
            CallSign = callsign;
            Mass = template.Mass;
            Size = template.Size;
            Position = Vector3.Zero;
            Direction = Vector3.UnitZ;
            Bearing = Angles.GetBearing(Vector3.UnitZ);
            Hull = EntityHull.Create(template.HitPoints);
            Cargo = ItemStorage.Create(template.Cargo);
            Modules = new ModulesCollection();

            _angularSpeed = 0;
        }

        public void HandleAction(ClientAction action)
        {
            if (!string.IsNullOrEmpty(action.Meta.Module))
            {
                Modules.Get(action.Meta.Module).HandleAction(action, this);
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

        public void UpdateSpeeds(double linearSpeed, double angularSpeed)
        {
            LinearSpeed = linearSpeed;
            _angularSpeed = angularSpeed;
        }

        public void ApplyDamage(int amount)
        {
            Hull.ApplyDamage(amount);
        }

        private void RotateBody(TimeSpan deltaT)
        {
            if (_angularSpeed == 0)
            {
                return;
            }

            var deltaYaw = Angles.ToRadians(_angularSpeed * deltaT.TotalSeconds);
            Direction = Vectors.Rotate(Direction, deltaYaw, 0, 0);

            Bearing = Angles.GetBearing(Direction);
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
