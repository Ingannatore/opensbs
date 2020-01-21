using System;

namespace OpenSBS.Engine.Exceptions
{
    public class UnknownMissionException : Exception
    {
        public UnknownMissionException(string id) : base($"Unknown mission with ID {id}") { }
    }
}
