using System;
using OpenSBS.Engine.Entities;
using OpenSBS.Engine.Messages;

namespace OpenSBS.Engine.Exceptions
{
    public class UnknownModuleCommandException : Exception
    {
        public UnknownModuleCommandException(Module module, Message message)
            : base($"Unknown command {message} for module {module}") { }
    }
}
