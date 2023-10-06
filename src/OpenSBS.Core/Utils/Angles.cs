using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

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
    }
}
