using System;
using System.Numerics;

namespace OpenSBS.Engine.Utils
{
    public static class Vectors
    {
        public static Vector3 Rotate(Vector3 value, double yaw, double pitch, double roll)
        {
            var rotationQuaternion = Quaternion.CreateFromYawPitchRoll(
                (float) yaw,
                (float) pitch,
                (float) roll
            );

            return Vector3.Normalize(Vector3.Transform(value, rotationQuaternion));
        }

        public static Vector3 Move(Vector3 position, Vector3 direction, double value)
        {
            return position + direction * (float) value;
        }

        public static Vector2 ToSector(Vector3 position)
        {
            return new Vector2(
                (float)Math.Floor((position.X + 25000) / 50000),
                (float)Math.Floor((position.Z + 25000) / 50000)
            );
        }
    }
}
