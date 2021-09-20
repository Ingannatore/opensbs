namespace OpenSBS.Engine.Models.Templates
{
    public abstract class ShieldModuleTemplate : ModuleTemplate
    {
        public int Capacity { get; protected set; }
        public int RechargeRate { get; protected set; }
    }
}
