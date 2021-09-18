using OpenSBS.Engine.Data.Modules;
using OpenSBS.Engine.Data.Templates;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Data.Spaceships
{
    [DataEntry(
        DataEntryCategory.Spaceship,
        "Viper-class Interceptor",
        Description = "A fast and agile ship used mainly against fighters and bombers"
    )]
    public class ViperInterceptor : Entity
    {
        public ViperInterceptor(string id, string name, string callsign) : base(
            id, name, callsign, ViperInterceptorTemplate.Instance
        )
        {
            Modules.Add(new SmallIonEngine("engine1"));
            Modules.Add(new SmallRadarSensors("radar1"));
            Modules.Add(new PrototypeMagneticShield("shield1"));
            Modules.Add(new MonoBlaster("blaster1"));
            Modules.Add(new MonoBlaster("blaster2"));
        }
    }
}
