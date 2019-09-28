using System;
using System.Globalization;
using OpenSBS.Engine;

namespace OpenSBS.Server
{
    public class Mission
    {
        private readonly GameState _state;

        public Mission(GameState state)
        {
            _state = state ?? throw new ArgumentNullException(nameof(state));
        }

        public void Initialize()
        {
            _state.SetValue("ship.bearing", "0");
            _state.SetValue("ship.rudder", "0");
        }

        public void Update()
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
