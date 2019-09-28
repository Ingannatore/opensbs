using OpenSBS.Engine.Commands;

namespace OpenSBS.Server.Commands
{
    public class UpdateStateCommand : Command
    {
        public string Key { get; }
        public string Value { get; }

        public UpdateStateCommand(string key, string value = null) : base("UPDATE_STATE")
        {
            Key = key;
            Value = value;
        }
    }
}
