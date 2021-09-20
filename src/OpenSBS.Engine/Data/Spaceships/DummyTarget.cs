using OpenSBS.Engine.Data.Spaceships.Templates;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Data.Spaceships
{
    public class DummyTarget : Entity
    {
        public DummyTarget(string id, string name, string callSign) : base(
            id, name, callSign, DummyTargetTemplate.Instance
        ) { }
    }
}
