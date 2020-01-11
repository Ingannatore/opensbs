namespace OpenSBS
{
    public class ServerProperties
    {
        public bool IsReady { get; }
        public bool IsRunning { get; }

        public ServerProperties(bool isReady, bool isRunning)
        {
            IsReady = isReady;
            IsRunning = isRunning;
        }
    }
}
