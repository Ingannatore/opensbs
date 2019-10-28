using System;
using System.Globalization;
using OpenSBS.Engine.Messages;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Engine
{
    public class Ship : ArtificialSpaceEntity
    {
        private readonly GameState _state;

        public Ship(string id, string name) : base(id, name, nameof(Ship), 100)
        {
            _state = new GameState();

            _state.SetValue("ship.bearing", "0");
            _state.SetValue("ship.rudder", "0");
        }

        public override string State()
        {
            return _state.ToJson();
        }

        public override void Update(TimeSpan timeSpan)
        {
            UpdateState(timeSpan);
        }

        public void HandleMessage(Message message)
        {
            if (message is UpdateStateMessage updateStateMessage)
            {
                _state.SetValue(updateStateMessage.Key, updateStateMessage.Value);
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
