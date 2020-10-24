using System;
using OpenSBS.Engine.Commands;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Engine.Exceptions
{
    public class UnknownModuleCommandException : Exception
    {
        public UnknownModuleCommandException(Module module, GameCommand message)
            : base($"Unknown command {message} for module {module}") { }
    }
}
