using OpenSBS.Core.Components;
using OpenSBS.Core.Components.Propulsion;
using System.Numerics;

namespace OpenSBS.Core
{
    internal class Hull : Entity, ICommandHandler, IUpdatable
    {
        public Hull(Vector3 position, Vector3 direction) : base(position, direction) { }

        public PropulsionComponent? Propulsion { get; set; }

        public void HandleCommand(ComponentCommand command)
        {
            switch (command.Component)
            {
                case ComponentTypes.Propulsion:
                    Propulsion?.HandleCommand(command); break;
            }
        }

        public void Update(TimeSpan deltaT)
        {
            Propulsion?.Update(deltaT);

            UpdateBody(
                deltaT,
                Propulsion?.RotationSpeed.Current ?? 0,
                Propulsion?.LinearSpeed.Current ?? 0
            );
        }
    }
}
