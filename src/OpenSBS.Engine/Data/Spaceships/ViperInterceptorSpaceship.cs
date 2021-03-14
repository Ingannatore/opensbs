using OpenSBS.Engine.Data.Modules;
using OpenSBS.Engine.Entities;
using OpenSBS.Engine.Spaceships;

namespace OpenSBS.Engine.Data.Spaceships
{
    public class ViperInterceptorSpaceship : Spaceship
    {
        public ViperInterceptorSpaceship(string id, string name, string callsign) : base(id, name, callsign)
        {
            Type = SpaceshipType.Interceptor;
            Description = "Viper-class Interceptor";
            Mass = 100000;
            Size = ThingSize.Small;

            Modules.Add(new SmallIonEngineModule("engine1"));
        }
    }
}
