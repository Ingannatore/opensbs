using System;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Models.Modules
{
    public interface IModule
    {
        public string Id { get; }
        public void HandleAction(ClientAction action);
        public void Update(TimeSpan deltaT, Entity owner, World world);
    }
}
