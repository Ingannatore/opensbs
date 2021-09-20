namespace OpenSBS.Engine.Models.Templates
{
    public abstract class ModuleTemplate
    {
        public string Name { get; protected set; }
        public int Mass { get; protected set; }
        public int Size { get; protected set; }
    }
}
