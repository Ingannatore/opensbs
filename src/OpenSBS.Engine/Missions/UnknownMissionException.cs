using System;

namespace OpenSBS.Engine.Missions
{
    public class UnknownMissionException : Exception
    {
        public UnknownMissionException(string id) : base($"Unknown mission with ID {id}") { }
    }
}
