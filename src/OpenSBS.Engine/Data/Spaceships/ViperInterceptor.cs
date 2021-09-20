using OpenSBS.Engine.Data.Modules;
using OpenSBS.Engine.Data.Spaceships.Templates;
using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Modules.Engines;
using OpenSBS.Engine.Modules.Sensors;
using OpenSBS.Engine.Modules.Shields;
using OpenSBS.Engine.Modules.Weapons;

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
            Modules.Add(EngineModule.Create(LimitedIonEngine.Instance));
            Modules.Add(SensorsModule.Create(ScatteredLidarSensors.Instance));
            Modules.Add(ShieldModule.Create(PrototypeMagneticShield.Instance));
            Modules.Add(WeaponModule.Create(MonoBlaster.Instance));
            Modules.Add(WeaponModule.Create(MonoBlaster.Instance));
        }
    }
}
