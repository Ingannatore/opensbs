namespace OpenSBS.Engine.Entities
{
    public abstract class Thing
    {
        public string Id { get; }
        public string Name { get; }
        public string Type { get; protected set; }
        public float Mass { get; protected set; }
        public float Size { get; protected set; }

        protected Thing(string id, string name)
        {
            Id = id;
            Name = name;
        }

        public override string ToString()
        {
            return $"{Id}:{Name}:{Type}";
        }
    }
}
