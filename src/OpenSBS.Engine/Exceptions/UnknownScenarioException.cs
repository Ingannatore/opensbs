using System;

namespace OpenSBS.Engine.Exceptions
{
    public class UnknownScenarioException : Exception
    {
        public UnknownScenarioException(string id) : base($"Unknown scenario with ID {id}") { }
    }
}
