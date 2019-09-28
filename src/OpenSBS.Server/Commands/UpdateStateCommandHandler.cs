using System;
using OpenSBS.Engine;
using OpenSBS.Engine.Commands;

namespace OpenSBS.Server.Commands
{
    public class UpdateStateCommandHandler : ICommandHandler
    {
        private readonly GameState _gameState;

        public UpdateStateCommandHandler(GameState gameState)
        {
            _gameState = gameState ?? throw new ArgumentNullException(nameof(gameState));
        }

        public void Handle(Command command)
        {
            if (command is UpdateStateCommand myCommand)
            {
                _gameState.SetValue(myCommand.Key, myCommand.Value);
            }
        }
    }
}
