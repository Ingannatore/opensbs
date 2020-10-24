using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace OpenSBS.Core.Commands
{
    public class GameCommand
    {
        [JsonProperty("type", Required = Required.Always)]
        public string Name { get; }

        [JsonProperty("payload", Required = Required.AllowNull)]
        public string Payload { get; }

        [JsonProperty("meta", Required = Required.AllowNull)]
        public GameCommandMetadata Meta { get; }

        public static GameCommand CreateInstance(string name, object payload)
        {
            var serializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new CamelCaseNamingStrategy()
                }
            };

            return new GameCommand(name, JsonConvert.SerializeObject(payload, serializerSettings));
        }

        public GameCommand(string name, string payload, GameCommandMetadata meta = null)
        {
            Name = name;
            Payload = payload;
            Meta = meta;
        }

        public T GetPayload<T>()
        {
            return JsonConvert.DeserializeObject<T>(
                Payload,
                new JsonSerializerSettings
                {
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new CamelCaseNamingStrategy()
                    }
                }
            );
        }
    }
}
