using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Templates;

namespace OpenSBS.Engine.Data.Spaceships.Templates
{
    public class DummyTargetTemplate : EntityTemplate
    {
        private static readonly object ClassLock = new object();
        private static DummyTargetTemplate _instance;

        public static DummyTargetTemplate Instance
        {
            get
            {
                lock (ClassLock)
                {
                    return _instance ??= new DummyTargetTemplate();
                }
            }
        }

        private DummyTargetTemplate()
        {
            Type = EntityType.Fighter;
            Mass = 1000;
            Size = 6;
            HitPoints = 100;
            Cargo = 10;
        }
    }
}
