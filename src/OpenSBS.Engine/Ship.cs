using System;
using System.Globalization;
using System.Threading.Tasks;
using OpenSBS.Engine.Commands;

namespace OpenSBS.Engine
{
    public class Ship
    {
        private readonly CommandsQueue _commands;
        private readonly GameState _state;
        public string State => _state.ToJson();

        public Ship()
        {
            _commands = new CommandsQueue();
            _state = new GameState();

            _state.SetValue("ship.bearing", "0");
            _state.SetValue("ship.rudder", "0");
        }

        public async Task EnqueueCommand(Command command)
        {
            await _commands.Enqueue(command);
        }

        public void Update(TimeSpan timeSpan)
        {
            HandleCommands();
            UpdateState(timeSpan);
        }

        private void HandleCommands()
        {
            while (!_commands.Empty)
            {
                var command = _commands.Dequeue();
                if (command is UpdateStateCommand myCommand)
                {
                    _state.SetValue(myCommand.Key, myCommand.Value);
                }
            }
        }

        private void UpdateState(TimeSpan timeSpan)
        {
            var currentRudder = _state.GetIntValue("ship.rudder");
            if (currentRudder == 0)
            {
                return;
            }

            var currentBearing = _state.GetDoubleValue("ship.bearing");
            var nextBearing = currentBearing + Math.Sign(currentRudder);
            if (nextBearing < 0)
            {
                nextBearing += 360;
            }
            if (nextBearing >= 360)
            {
                nextBearing -= 360;
            }

            _state.SetValue("ship.bearing", Math.Round(nextBearing, 2).ToString(CultureInfo.InvariantCulture));
        }
    }
}
