namespace OpenSBS.Server
{
    public class SocketEvent
    {
        public string Type { get; }
        public object Value { get; }

        public SocketEvent(string type, object value = null)
        {
            Type = type;
            Value = value;
        }

        public T GetValue<T>()
        {
            return (T) Value;
        }
    }
}
