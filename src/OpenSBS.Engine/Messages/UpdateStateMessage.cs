namespace OpenSBS.Engine.Messages
{
    public class UpdateStateMessage : Message
    {
        public string Key { get; }
        public string Value { get; }

        public UpdateStateMessage(string key, string value = null) : base("UPDATE_STATE", "PLAYER_SHIP")
        {
            Key = key;
            Value = value;
        }
    }
}
