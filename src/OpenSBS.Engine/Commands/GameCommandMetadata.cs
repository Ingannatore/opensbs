namespace OpenSBS.Engine.Commands
{
    public class GameCommandMetadata
    {
        public string Entity { get; }
        public string Module { get; }

        public GameCommandMetadata(string entity, string module)
        {
            Entity = entity;
            Module = module;
        }
    }
}
