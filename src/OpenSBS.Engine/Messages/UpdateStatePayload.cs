namespace OpenSBS.Engine.Messages
{
    public class UpdateStatePayload
    {
        public string Key { get; }
        public string Value { get; }

        public UpdateStatePayload(string key, string value = null)
        {
            Key = key;
            Value = value;
        }
    }
}
