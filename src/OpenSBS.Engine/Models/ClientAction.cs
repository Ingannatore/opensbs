namespace OpenSBS.Engine.Models
{
    public class ClientAction
    {
        public string Type { get; set; }
        public object Payload { get; set; }
        public ClientActionMetadata Meta { get; set; }

        public ClientAction(string type, object payload)
        {
            Type = type;
            Payload = payload;
        }
    }
}
