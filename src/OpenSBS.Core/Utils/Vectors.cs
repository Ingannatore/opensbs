using System.Numerics;

namespace OpenSBS.Core.Utils
{
    internal static class Vectors
    {
        public static Vector2 Rotate(Vector2 value, double yaw, double pitch = 0, double roll = 0)
        {
            var rotationQuaternion = Quaternion.CreateFromYawPitchRoll(
                (float)yaw,
                (float)pitch,
                (float)roll
            );

            return Vector2.Normalize(Vector2.Transform(value, rotationQuaternion));
        }

        public static Vector2 Move(Vector2 position, Vector2 direction, double value)
        {
            return position + direction * (float)value;
        }
    }
}
