namespace OpenSBS.Engine.Modules.Weapons
{
    public class WeaponMagazine
    {
        public int Size { get; }
        public int Current { get; protected set; }

        public WeaponMagazine(int size)
        {
            Size = size;
            Current = 0;
        }
    }
}
