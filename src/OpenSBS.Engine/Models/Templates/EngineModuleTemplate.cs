namespace OpenSBS.Engine.Models.Templates
{
    public abstract class EngineModuleTemplate : ModuleTemplate
    {
        public int MaximumSpeed { get; protected set; }
        public int Acceleration { get; protected set; }
        public int Deceleration { get; protected set; }
        public int RotationSpeed { get; protected set; }
    }
}
