using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Templates;

namespace OpenSBS.Engine.Data.Spaceships.Templates
{
    public class ViperCruiserTemplate : EntityTemplate
    {
        private static readonly object ClassLock = new object();
        private static ViperCruiserTemplate _instance;

        public static ViperCruiserTemplate Instance
        {
            get
            {
                lock (ClassLock)
                {
                    return _instance ??= new ViperCruiserTemplate();
                }
            }
        }

        private ViperCruiserTemplate()
        {
            Type = EntityType.Cruiser;
            Mass = 100000;
            Size = 50;
            HitPoints = 500;
            Cargo = 1000;
        }
    }
}
