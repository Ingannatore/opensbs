using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace OpenSBS.Engine.Utils
{
    public static class JsonConverter
    {
        private static readonly JsonSerializerSettings SerializerSettings = new JsonSerializerSettings
        {
            ContractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            }
        };

        public static string Serialize(object payload)
        {
            return JsonConvert.SerializeObject(payload, SerializerSettings);
        }

        public static T Deserialize<T>(string json)
        {
            return JsonConvert.DeserializeObject<T>(json, SerializerSettings);
        }
    }
}
