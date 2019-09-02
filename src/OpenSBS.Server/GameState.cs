using System.Collections.Generic;
using Newtonsoft.Json;

namespace OpenSBS.Server
{
    public class GameState
    {
        private readonly IDictionary<string, object> _values;

        public GameState()
        {
            _values = new Dictionary<string, object>();
        }

        public T GetValue<T>(string key)
        {
            return (T) _values[key];
        }

        public void SetValue(string key, object value)
        {
            _values[key] = value;
        }

        public string ToJSON()
        {
            return JsonConvert.SerializeObject(_values);
        }
    }
}
