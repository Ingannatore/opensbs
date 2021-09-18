using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Templates;

namespace OpenSBS.Engine.Data.Templates
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
            Type = EntityType.Dummy;
            Mass = 1000;
            Size = 5;
            HitPoints = 50;
            Cargo = 0;
        }
    }
}
