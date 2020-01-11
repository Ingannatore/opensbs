namespace OpenSBS.Engine.Messages
{
    public class MessageResponse
    {
        public string Action { get; }
        public object Payload { get; }

        public MessageResponse(string action, object payload = null)
        {
            Action = action;
            Payload = payload;
        }
    }
}
