using System;
using System.Numerics;

namespace OpenSBS.Engine.Utils
{
    public static class Angles
    {
        public static double ToRadians(double value)
        {
            return (float) (value * (Math.PI / 180));
        }

        public static double ToDegrees(double value)
        {
            return (float) (value * (180 / Math.PI));
        }

        public static double FromVector(Vector3 vector)
        {
            return ToDegrees(Math.Atan2(vector.Z, vector.X));
        }
    }
}
