using OpenSBS.Core.Commands;

namespace OpenSBS.Engine.Entities
{
    public interface IModule : IUpdatable
    {
        void HandleMessage(GameCommand command);
    }
}
