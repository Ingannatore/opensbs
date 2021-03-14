using System;
using System.Numerics;

namespace OpenSBS.Engine.Utils
{
    public static class Vectors
    {
        public static Vector3 ChangeDirection(Vector3 value, double yaw, double pitch, double roll)
        {
            var rotationQuaternion = Quaternion.CreateFromYawPitchRoll((float) yaw, (float) pitch, (float) roll);
            return Vector3.Normalize(Vector3.Transform(value, rotationQuaternion));
        }

        public static Vector3 Move(Vector3 position, Vector3 direction, double value)
        {
            return position + direction * (float) value;
        }

        public static double AngleBetween(Vector3 vector1, Vector3 vector2)
        {
            return Math.Acos(Vector3.Dot(vector1, vector2) / (vector1.Length() * vector2.Length()));
        }
    }
}
