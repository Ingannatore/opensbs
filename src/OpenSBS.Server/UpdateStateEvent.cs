namespace OpenSBS.Server
{
    public class UpdateStateEvent
    {
        public string Key { get; }
        public string Value { get; }

        public UpdateStateEvent(string key, string value = null)
        {
            Key = key;
            Value = value;
        }
    }
}
