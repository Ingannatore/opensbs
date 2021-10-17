using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Templates;

namespace OpenSBS.Engine.Data.Spaceships.Templates
{
    public class FloatingContainerTemplate : EntityTemplate
    {
        private static readonly object ClassLock = new object();
        private static FloatingContainerTemplate _instance;

        public static FloatingContainerTemplate Instance
        {
            get
            {
                lock (ClassLock)
                {
                    return _instance ??= new FloatingContainerTemplate();
                }
            }
        }

        private FloatingContainerTemplate()
        {
            Type = EntityType.Container;
            Mass = 100;
            Size = 2;
            HitPoints = 20;
            Cargo = 0;
        }
    }
}
