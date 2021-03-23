using System;
using System.Numerics;

namespace OpenSBS.Engine.Utils
{
    public static class Angles
    {
        public static float ToRadians(float value)
        {
            return (float) (value * (Math.PI / 180));
        }

        public static float ToDegrees(float value)
        {
            return (float) (value * (180 / Math.PI));
        }

        public static float FromVector(Vector3 vector)
        {
            return ToDegrees((float) Math.Atan2(vector.Z, vector.X));
        }
    }
}
