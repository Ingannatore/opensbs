using OpenSBS.Engine.Data.Modules;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Data.Spaceships
{
    public class ViperInterceptor : Entity
    {
        public ViperInterceptor(string id, string name, string callsign) : base(
            id, EntityType.Interceptor, name, callsign
        )
        {
            Mass = 100000;
            Size = 50;

            Modules.Add(new SmallIonEngine("engine1"));
        }
    }
}
