using Newtonsoft.Json.Linq;

namespace OpenSBS.Engine.Messages
{
    public class Message
    {
        public MessageRecipient Recipient { get; }
        public string Command { get; }
        public JValue Content { get; }

        public Message(string recipient, string command, JValue content)
        {
            Recipient = new MessageRecipient(recipient);
            Command = command;
            Content = content;
        }

        public override string ToString()
        {
            return $"{Recipient}:{Command}";
        }
    }
}
