using OpenSBS.Engine.Entities;

namespace OpenSBS.Engine
{
    public class DummyTarget: ArtificialEntity
    {
        public DummyTarget(string id, string name) : base(id, name, "dummy", 10)
        {
            SetMass(100);
            SetSize(10);
        }
    }
}
