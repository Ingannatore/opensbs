namespace OpenSBS.Engine.Messages
{
    public abstract class Message
    {
        public string Id { get; }
        public string Recipient { get; }

        protected Message(string id, string recipient)
        {
            Id = id;
            Recipient = recipient;
        }
    }
}
