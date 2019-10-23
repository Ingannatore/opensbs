namespace OpenSBS.Engine.Commands
{
    public abstract class Command
    {
        public string Id { get; }
        public string Recipient { get;  }

        protected Command(string id, string recipient)
        {
            Id = id;
            Recipient = recipient;
        }
    }
}
