using OpenSBS.Engine.Data.Modules;
using OpenSBS.Engine.Models;

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
            id, EntityType.Interceptor, name, callsign
        )
        {
            Mass = 100000;
            Size = 50;

            Modules.Add(new GeneralStorage("storage1", 1));
            Modules.Add(new SmallIonEngine("engine1"));
            Modules.Add(new SmallRadarSensors("radar1"));
            Modules.Add(new PrototypeMagneticShield("shield1"));
            Modules.Add(new SmallBlaster("blaster1"));
            Modules.Add(new SmallBlaster("blaster2"));
        }
    }
}
