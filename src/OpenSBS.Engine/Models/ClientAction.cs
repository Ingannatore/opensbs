using OpenSBS.Engine.Utils;

namespace OpenSBS.Engine.Models
{
    public class ClientAction
    {
        public string Type { get; set; }
        public string Payload { get; set; }
        public ClientActionMetadata Meta { get; set; }

        public ClientAction(string type, object payload)
        {
            Type = type;
            Payload = JsonConverter.Serialize(payload);
        }

        public bool IsServerRecipient()
        {
            return Meta == null || Meta.IsServerRecipient();
        }

        public T PayloadTo<T>()
        {
            return JsonConverter.Deserialize<T>(Payload);
        }
    }
}
