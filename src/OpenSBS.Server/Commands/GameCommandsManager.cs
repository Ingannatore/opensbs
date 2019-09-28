using OpenSBS.Engine;
using OpenSBS.Engine.Commands;

namespace OpenSBS.Server.Commands
{
    public class GameCommandsManager : CommandsManager
    {
        public GameCommandsManager(GameState state, CommandsQueue queue) : base(queue)
        {
            RegisterHandler(typeof(UpdateStateCommand), new UpdateStateCommandHandler(state));
        }
    }
}
