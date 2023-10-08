using System.Numerics;

namespace OpenSBS.Core.Utils
{
    internal static class Vectors
    {
        public static Vector2 Rotate(Vector2 direction, float yaw, float pitch = 0, float roll = 0) =>
            Vector2.Normalize(Vector2.Transform(direction, Quaternion.CreateFromYawPitchRoll(yaw, pitch, roll)));

        public static Vector2 Move(Vector2 position, Vector2 direction, float value) =>
            position + direction * value;
    }
}
