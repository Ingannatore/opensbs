namespace OpenSBS.Engine.Models.Templates
{
    public abstract class WeaponModuleTemplate : ModuleTemplate
    {
        public int Damage { get; protected set; }
        public int Range { get; protected set; }
        public int AmmoPerCycle { get; protected set; }
        public int MagazineSize { get; protected set; }
        public int CycleTime { get; protected set; }
        public int ReloadTime { get; protected set; }
    }
}
