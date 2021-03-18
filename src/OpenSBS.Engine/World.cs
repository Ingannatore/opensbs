using System;
using System.Collections;
using System.Collections.Generic;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine
{
    public class World : IEnumerable<Entity>
    {
        private readonly ICollection<Entity> _entities;

        public World()
        {
            _entities = new List<Entity>();
        }

        public void AddEntity(Entity entity)
        {
            _entities.Add(entity);
        }

        public void Update(TimeSpan deltaT)
        {
            foreach (var entity in _entities)
            {
                entity.Update(deltaT, this);
            }
        }

        public IEnumerator<Entity> GetEnumerator()
        {
            return _entities.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
