using System;

namespace OpenSBS.Engine.Models.Entities
{
    public class EntityHull
    {
        public int MaxHp { get; }
        public int CurrentHp { get; private set; }
        public double Ratio { get; private set; }
        public bool IsDestroyed => CurrentHp <= 0;

        public static EntityHull Create(int hp)
        {
            return new EntityHull(hp);
        }

        private EntityHull(int hp)
        {
            CurrentHp = hp;
            MaxHp = hp;
            Ratio = 100;
        }

        public void ApplyDamage(int amount)
        {
            CurrentHp = Math.Max(CurrentHp - amount, 0);
            Ratio = CurrentHp / (double)MaxHp;
        }
    }
}
