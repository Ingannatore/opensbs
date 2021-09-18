using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Templates;

namespace OpenSBS.Engine.Data.Templates
{
    public class BastionStationTemplate : EntityTemplate
    {
        private static readonly object ClassLock = new object();
        private static BastionStationTemplate _instance;

        public static BastionStationTemplate Instance
        {
            get
            {
                lock (ClassLock)
                {
                    return _instance ??= new BastionStationTemplate();
                }
            }
        }

        private BastionStationTemplate()
        {
            Type = EntityType.Station;
            Mass = 100000000;
            Size = 1000;
            HitPoints = 100000;
            Cargo = 1000000;
        }
    }
}
