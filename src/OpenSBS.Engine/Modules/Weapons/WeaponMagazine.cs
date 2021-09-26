using OpenSBS.Engine.Models.Items;

namespace OpenSBS.Engine.Modules.Weapons
{
    public class WeaponMagazine
    {
        public string AmmoType { get; }
        public string AmmoId => _content?.Item.Id;
        public string Name => _content?.Item.Name;
        public int Quantity => _content?.Quantity ?? 0;
        public double Ratio => Quantity / (double)_size;
        public bool IsFull => Quantity == _size;

        private readonly int _size;
        private ItemStack _content;

        public WeaponMagazine(string ammoType, int size)
        {
            AmmoType = ammoType;
            _size = size;
        }

        public bool IsEmpty()
        {
            return _content?.IsEmpty ?? true;
        }

        public ItemStack Reload(ItemStack ammo)
        {
            if (_content == null)
            {
                _content = ammo;
                return null;
            }

            if (_content.IsSameItem(ammo))
            {
                _content.Increment(ammo.Quantity);
                return null;
            }

            var currentAmmoStack = _content;
            _content = ammo;
            return currentAmmoStack;
        }

        public ItemStack Unload()
        {
            var currentContent = _content;
            _content = null;

            return currentContent;
        }

        public void Consume(int quantity)
        {
            _content.Decrement(quantity);
        }
    }
}
