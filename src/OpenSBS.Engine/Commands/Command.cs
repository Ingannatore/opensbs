namespace OpenSBS.Engine.Commands
{
    public abstract class Command
    {
        public string Id { get; }

        protected Command(string id)
        {
            Id = id;
        }
    }
}
