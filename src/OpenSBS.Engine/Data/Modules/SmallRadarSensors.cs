using OpenSBS.Engine.Modules.Sensors;

namespace OpenSBS.Engine.Data.Modules
{
    public class SmallRadarSensors : SensorsModule
    {
        public SmallRadarSensors(string id) : base(id, "2GHz Radar Array Sensors")
        {
            Mass = 2500;
            Size = 5;
            Range = 50000;
        }
    }
}
