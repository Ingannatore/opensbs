using System.Numerics;

namespace OpenSBS.Engine
{
    public class AbstractEntity : IUpdatable
    {
        public string ID { get; private set; }
        public string Name { get; private set; }
        public string Type { get; private set; }
        public Vector3 Position { get; set; }
        public Vector3 Rotation { get; set; }
        public float Mass { get; set; }
        public float Size { get; set; }
        
        public void Update()
        {
            throw new System.NotImplementedException();
        }
    }
}