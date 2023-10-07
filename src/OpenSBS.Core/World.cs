using System.Collections;
using OpenSBS.Core.Models;

namespace OpenSBS.Core
{
    internal class World : IEnumerable<Entity>
    {
        private readonly IDictionary<string, Entity> _entities;

        public World()
        {
            _entities = new Dictionary<string, Entity>();
        }

        public void Update(TimeSpan deltaT)
        {
            foreach (var entity in _entities.Values)
            {
                entity.Update(deltaT, this);
            }
        }

        public bool ExistsEntity(string id) => _entities.ContainsKey(id);
        public void AddEntity(Entity entity) => _entities[entity.Id] = entity;

        public IEnumerator<Entity> GetEnumerator() => _entities.Values.GetEnumerator();
        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }
}
