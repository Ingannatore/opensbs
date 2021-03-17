namespace OpenSBS.Engine.Models
{
    public class ClientActionMetadata
    {
        public bool Socket { get; set; }
        public string Entity { get; set; }
        public string Module { get; set; }

        public bool IsServerRecipient()
        {
            return string.IsNullOrEmpty(Entity) && string.IsNullOrEmpty(Module);
        }
    }
}
