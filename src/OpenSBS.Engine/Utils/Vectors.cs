using System.Numerics;

namespace OpenSBS.Engine.Utils
{
    public static class Vectors
    {
        public static Vector3 Rotate(Vector3 value, float yaw, float pitch, float roll)
        {
            var rotationQuaternion = Quaternion.CreateFromYawPitchRoll(yaw, pitch, roll);
            return Vector3.Normalize(Vector3.Transform(value, rotationQuaternion));
        }

        public static Vector3 Move(Vector3 position, Vector3 direction, float value)
        {
            return position + direction * value;
        }
    }
}
