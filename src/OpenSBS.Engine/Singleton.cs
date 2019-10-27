using System;

namespace OpenSBS.Engine
{
    public abstract class Singleton<T> where T : new()
    {
        private static readonly Lazy<T> SingletonInstance = new Lazy<T>(() => new T());
        public static T Instance => SingletonInstance.Value;
    }
}
