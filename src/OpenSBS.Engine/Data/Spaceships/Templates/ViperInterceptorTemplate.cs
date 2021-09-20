using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Templates;

namespace OpenSBS.Engine.Data.Spaceships.Templates
{
    public class ViperInterceptorTemplate : EntityTemplate
    {
        private static readonly object ClassLock = new object();
        private static ViperInterceptorTemplate _instance;

        public static ViperInterceptorTemplate Instance
        {
            get
            {
                lock (ClassLock)
                {
                    return _instance ??= new ViperInterceptorTemplate();
                }
            }
        }

        private ViperInterceptorTemplate()
        {
            Type = EntityType.Interceptor;
            Mass = 100000;
            Size = 50;
            HitPoints = 500;
            Cargo = 1000;
        }
    }
}
