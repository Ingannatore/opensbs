using System;
using System.Collections;
using System.Collections.Generic;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine
{
    public class World : IEnumerable<Entity>
    {
        private readonly IDictionary<string, Entity> _entities;

        public World()
        {
            _entities = new Dictionary<string, Entity>();
        }

        public bool ExistsEntity(string id)
        {
            return _entities.ContainsKey(id);
        }

        public void AddEntity(Entity entity)
        {
            _entities[entity.Id] = entity;
        }

        public Entity GetEntity(string id)
        {
            return _entities[id];
        }

        public void DamageEntity(string id, int amount)
        {
            _entities[id].ApplyDamage(amount);
        }

        public void Update(TimeSpan deltaT)
        {
            foreach (var entity in _entities.Values)
            {
                if (entity.Hull.IsDestroyed)
                {
                    _entities.Remove(entity.Id);
                    continue;
                }

                entity.Update(deltaT, this);
            }
        }

        public IEnumerator<Entity> GetEnumerator()
        {
            return _entities.Values.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
