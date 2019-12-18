using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using OpenSBS.Engine.Messages;

namespace OpenSBS.Engine.Entities
{
    public abstract class ArtificialEntity : Entity
    {
        public BoundedValue HitPoints { get; }
        public bool IsDestroyed => HitPoints.Current <= 0;
        public ICollection<Module> Modules => _modules.Values;
        private readonly IDictionary<string, Module> _modules;

        protected ArtificialEntity(string id, string name, string type, int hitpoints) : base(id, name, type)
        {
            _modules = new Dictionary<string, Module>();
            HitPoints = new BoundedValue(hitpoints);
        }

        public void HandleMessage(Message message)
        {
            if (message.Recipient.IsModule)
            {
                _modules[message.Recipient.ModuleId].HandleMessage(message);
            }
        }

        public override void Update(TimeSpan timeSpan)
        {
            foreach (var module in _modules.Values)
            {
                module.Update(timeSpan);
            }
        }

        public override string State()
        {
            return JsonConvert.SerializeObject(
                this,
                new JsonSerializerSettings
                {
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new CamelCaseNamingStrategy()
                    }
                }
            );
        }

        protected void AddModule(Module module)
        {
            _modules.Add(module.Id, module.SetOwner(this));
        }
    }
}
