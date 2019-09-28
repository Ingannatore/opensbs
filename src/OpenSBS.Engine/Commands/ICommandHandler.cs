namespace OpenSBS.Engine.Commands
{
    public interface ICommandHandler
    {
        void Handle(Command command);
    }
}
