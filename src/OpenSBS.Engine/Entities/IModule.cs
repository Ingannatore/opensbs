using OpenSBS.Engine.Messages;

namespace OpenSBS.Engine.Entities
{
    public interface IModule : IUpdatable
    {
        void HandleMessage(Message message);
    }
}
