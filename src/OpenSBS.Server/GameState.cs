using System.Collections.Generic;
using Newtonsoft.Json;

namespace OpenSBS.Server
{
    public class GameState
    {
        private readonly IDictionary<string, string> _values;

        public GameState()
        {
            _values = new Dictionary<string, string>();
        }

        public string GetValue(string key)
        {
            return _values[key];
        }

        public int GetIntValue(string key)
        {
            return int.Parse(_values[key]);
        }

        public double GetDoubleValue(string key)
        {
            return double.Parse(_values[key]);
        }

        public void SetValue(string key, string value)
        {
            _values[key] = value;
        }

        public string ToJSON()
        {
            return JsonConvert.SerializeObject(_values);
        }
    }
}
