using OpenSBS.Engine.Utils;

namespace OpenSBS.Engine.Models
{
    public class GameAction
    {
        public string Type { get; set; }
        public string Payload { get; set; }
        public GameActionMetadata Meta { get; set; }

        public GameAction(string type, object payload)
        {
            Type = type;
            Payload = JsonConverter.Serialize(payload);
        }

        public T PayloadTo<T>()
        {
            return JsonConverter.Deserialize<T>(Payload);
        }
    }
}
