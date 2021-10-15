using OpenSBS.Engine.Models.Templates;

namespace OpenSBS.Engine.Data.Modules
{
    public class ScatteredLidarSensors : SensorsModuleTemplate
    {
        private static readonly object ClassLock = new object();
        private static ScatteredLidarSensors _instance;

        public static ScatteredLidarSensors Instance
        {
            get
            {
                lock (ClassLock)
                {
                    return _instance ??= new ScatteredLidarSensors();
                }
            }
        }

        private ScatteredLidarSensors()
        {
            Name = "Scattered LIDAR Sensors";
            Mass = 2500;
            Size = 5;

            Range = 20000;
        }
    }
}
