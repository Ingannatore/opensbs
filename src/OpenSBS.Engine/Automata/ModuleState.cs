using System;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Automata
{
    public abstract class ModuleState<TM, TS>
    {
        public virtual void OnEnter(TM module) { }

        public abstract string GetName();
        public abstract TS Update(TimeSpan deltaT, TM module, Entity owner, World world);
    }
}
