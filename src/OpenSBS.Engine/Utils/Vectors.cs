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
            var normalizedDirection = new Vector3(-direction.Z, direction.Y, direction.X);
            return position + normalizedDirection * (float) value;
        }
    }
}
