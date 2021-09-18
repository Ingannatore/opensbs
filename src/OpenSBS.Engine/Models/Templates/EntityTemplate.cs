namespace OpenSBS.Engine.Models.Templates
{
    public abstract class EntityTemplate
    {
        public string Type { get; protected set; }
        public int Mass { get; protected set; }
        public int Size { get; protected set; }
        public int HitPoints { get; protected set; }
        public int Cargo { get; protected set; }
    }
}
