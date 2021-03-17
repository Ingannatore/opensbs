using OpenSBS.Engine.Models;

namespace OpenSBS.Engine
{
    public interface IStateSender
    {
        void Send(ClientAction action);
    }
}
