using Newtonsoft.Json.Linq;

namespace OpenSBS.Engine.Messages
{
    public class Message
    {
        public string Recipient { get; }
        public string ModuleId { get; }
        public string Command { get; }
        public JRaw Payload { get; }
        public bool IsForModule => !string.IsNullOrWhiteSpace(ModuleId);

        public Message(string recipient, string moduleId, string command, JRaw payload)
        {
            Recipient = recipient;
            ModuleId = moduleId;
            Command = command;
            Payload = payload;
        }
    }
}
