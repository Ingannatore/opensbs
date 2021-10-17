using OpenSBS.Engine.Data.Spaceships.Templates;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Data.Spaceships
{
    public class FloatingContainer : Entity
    {
        public FloatingContainer(string id, string name, string callSign) : base(
            id, name, callSign, FloatingContainerTemplate.Instance
        ) { }
    }
}
