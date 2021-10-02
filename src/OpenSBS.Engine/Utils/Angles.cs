using System;
using System.Numerics;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Utils
{
    public static class Angles
    {
        public static double ToRadians(double value)
        {
            return value * (Math.PI / 180);
        }

        public static double ToDegrees(double value)
        {
            return value * (180 / Math.PI);
        }

        public static double GetBearing(Vector3 direction)
        {
            var degrees = ToDegrees(Math.Atan2(direction.Z, direction.X));
            var rotatedDegrees = degrees >= -90 ? degrees - 90 : 270 + degrees;
            return rotatedDegrees <= 0 ? -rotatedDegrees : 360 - rotatedDegrees;
        }

        public static string ToEntitySide(Vector3 direction, Vector3 relativeDirection)
        {
            var degrees = ToDegrees(
                Math.Acos(
                    Vector3.Dot(
                        Vector3.Normalize(direction),
                        Vector3.Normalize(relativeDirection)
                    )
                )
            );

            if (degrees <= 45)
            {
                return EntitySide.Front;
            }

            if (degrees >= 135)
            {
                return EntitySide.Rear;
            }

            return relativeDirection.X > 0 ? EntitySide.Right : EntitySide.Left;
        }
    }
}
