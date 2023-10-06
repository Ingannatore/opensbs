namespace OpenSBS.Core.Components
{
    internal abstract class Component : ICommandHandler, IUpdatable
    {
        public abstract void HandleCommand(ComponentCommand command);
        public abstract void Update(TimeSpan deltaT);
    }
}
