using Newtonsoft.Json.Linq;

namespace OpenSBS.Engine.Messages
{
    public class Message
    {
        public string Recipient { get; }
        public JObject Payload { get; }

        public Message(string recipient, JObject payload)
        {
            Recipient = recipient;
            Payload = payload;
        }
    }
}
