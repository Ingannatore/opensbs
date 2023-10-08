using System.Numerics;

namespace OpenSBS.Core.Utils
{
    internal static class Angles
    {
        public static double ToRadians(double value)
        {
            return value * (Math.PI / 180);
        }

        public static double ToDegrees(double value)
        {
            return value * (180 / Math.PI);
        }

        public static double ToBearing(Vector2 direction)
        {
            var degrees = ToDegrees(Math.Atan2(direction.Y, direction.X));
            var rotatedDegrees = degrees >= -90 ? degrees - 90 : 270 + degrees;
            return rotatedDegrees <= 0 ? -rotatedDegrees : 360 - rotatedDegrees;
        }
    }
}
