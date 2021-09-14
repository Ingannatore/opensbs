using System;
using OpenSBS.Engine.Models;
using OpenSBS.Engine.Modules.Storage;

namespace OpenSBS.Engine.Data.Modules
{
    public class GeneralStorage : StorageModule
    {
        public GeneralStorage(string id, int size) : base(id, "General Storage")
        {
            Mass = 500;
            Size = size;
            Space = size * 1000;
        }

        public override void HandleAction(ClientAction action) { }

        public override void Update(TimeSpan deltaT, Entity owner, World world) { }
    }
}
