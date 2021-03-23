using System;
using System.Collections;
using System.Collections.Generic;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine
{
    public class World : IEnumerable<Entity>
    {
        private readonly IDictionary<string, Entity> _entities;

        public World()
        {
            _entities = new Dictionary<string, Entity>();
        }

        public void AddEntity(Entity entity)
        {
            _entities[entity.Id] = entity;
        }

        public void Update(TimeSpan deltaT)
        {
            foreach (var entity in _entities.Values)
            {
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
