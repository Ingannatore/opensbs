namespace OpenSBS.Core
{
    internal interface ICommandHandler
    {
        public void HandleCommand(ComponentCommand command);
    }
}
