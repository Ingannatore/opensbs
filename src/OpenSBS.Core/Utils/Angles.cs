using System.Numerics;

namespace OpenSBS.Core.Utils
{
    internal static class Angles
    {
        public static double ToRadians(double degrees) =>
            degrees * (Math.PI / 180);

        public static double ToDegrees(double radians) =>
            radians * (180 / Math.PI);

        public static int ToBearing(Vector2 direction) =>
            (int)Math.Round((Math.Atan2(direction.Y, direction.X) + 360) % 360);
    }
}
