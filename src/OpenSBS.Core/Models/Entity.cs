using OpenSBS.Core.Components;
using System.Numerics;

namespace OpenSBS.Core.Models
{
    internal abstract class Entity
    {
        public string Id { get; }
        public BodyComponent Body { get; private set; }
        public PropulsionComponent? Propulsion { get; set; }
        public ElectronicComponent? Electronic { get; set; }

        protected Entity(string id, Vector3 position, Vector3 direction)
        {
            Id = id;
            Body = new(position, direction);
        }

        public void Update(TimeSpan deltaT, World world)
        {
            Propulsion?.Update(deltaT, this);
            Electronic?.Update(deltaT, this, world);

            Body.Update(deltaT);
        }

        public void HandleCommand(ComponentCommand command)
        {
            switch (command.Component)
            {
                case ComponentTypes.Propulsion:
                    Propulsion?.HandleCommand(command); break;

                case ComponentTypes.Electronic:
                    Electronic?.HandleCommand(command); break;
            }
        }
    }
}
