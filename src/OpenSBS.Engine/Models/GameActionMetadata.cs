namespace OpenSBS.Engine.Models
{
    public class GameActionMetadata
    {
        public bool Socket { get; set; }
        public string Entity { get; set; }
        public string Module { get; set; }

        public bool IsServerAction()
        {
            return string.IsNullOrEmpty(Entity) && string.IsNullOrEmpty(Module);
        }
    }
}
