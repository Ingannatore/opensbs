namespace OpenSBS.Server
{
    public class SetStateEvent
    {
        public string Key { get; }
        public string Value { get; }

        public SetStateEvent(string key, string value = null)
        {
            Key = key;
            Value = value;
        }
    }
}
