namespace OpenSBS.Engine.Models.Items
{
    public abstract class Item
    {
        public string Id { get; }
        public string Type { get; }
        public string Name { get; }
        public int Mass { get; protected set; }

        protected Item(string id, string type, string name)
        {
            Id = id;
            Type = type;
            Name = name;
        }
    }
}
