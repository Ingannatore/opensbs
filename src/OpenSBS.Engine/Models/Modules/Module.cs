using System;
using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Templates;

namespace OpenSBS.Engine.Models.Modules
{
    public abstract class Module<T> : IModule where T : ModuleTemplate
    {
        public string Id { get; }
        public string Type { get; }
        public T Template { get; }

        protected Module(string type, T template)
        {
            Id = Guid.NewGuid().ToString("N");
            Type = type;
            Template = template;
        }

        public abstract void HandleAction(ClientAction action, Entity owner);
        public abstract void Update(TimeSpan deltaT, Entity owner, World world);
    }
}
