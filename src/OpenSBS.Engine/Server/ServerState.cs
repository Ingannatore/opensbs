namespace OpenSBS.Engine.Server
{
    public class ServerState
    {
        public bool IsReady { get; }
        public bool IsRunning { get; }

        public ServerState(bool isReady, bool isRunning)
        {
            IsReady = isReady;
            IsRunning = isRunning;
        }
    }
}
