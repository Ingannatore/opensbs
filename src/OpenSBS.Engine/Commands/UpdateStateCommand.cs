namespace OpenSBS.Engine.Commands
{
    public class UpdateStateCommand : Command
    {
        public string Key { get; }
        public string Value { get; }

        public UpdateStateCommand(string key, string value = null) : base("UPDATE_STATE", "PLAYER_SHIP")
        {
            Key = key;
            Value = value;
        }
    }
}
