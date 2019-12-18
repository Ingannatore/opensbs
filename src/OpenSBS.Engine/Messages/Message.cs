using Newtonsoft.Json.Linq;

namespace OpenSBS.Engine.Messages
{
    public class Message
    {
        public MessageRecipient Recipient { get; }
        public string Command { get; }
        public JRaw Payload { get; }

        public Message(string recipient, string command, JRaw payload)
        {
            Recipient = new MessageRecipient(recipient);
            Command = command;
            Payload = payload;
        }

        public override string ToString()
        {
            return $"{Recipient}:{Command}";
        }
    }
}
