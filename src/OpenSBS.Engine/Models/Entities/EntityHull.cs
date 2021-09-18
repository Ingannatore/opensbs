using System;

namespace OpenSBS.Engine.Models.Entities
{
    public class EntityHull
    {
        public int CurrentHp { get; protected set; }
        public int MaxHp { get; }
        public bool IsDestroyed => CurrentHp <= 0;

        public static EntityHull Create(int hp)
        {
            return new EntityHull(hp);
        }

        private EntityHull(int hp)
        {
            CurrentHp = hp;
            MaxHp = hp;
        }

        public void ApplyDamage(int amount)
        {
            CurrentHp = Math.Max(CurrentHp - amount, 0);
        }
    }
}
