using System.Text.Json;

namespace OpenSBS.Core.Components
{
    internal class ComponentCommand
    {
        public string Component { get; }
        public string Action { get; }
        public string Payload { get; }

        public ComponentCommand(string component, string action, string payload)
        {
            Component = component;
            Action = action;
            Payload = payload;
        }

        public T PayloadTo<T>()
        {
            return JsonSerializer.Deserialize<T>(Payload)!;
        }
    }
}
