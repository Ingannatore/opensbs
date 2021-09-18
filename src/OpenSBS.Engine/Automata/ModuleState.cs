﻿using System;
using OpenSBS.Engine.Models.Entities;

namespace OpenSBS.Engine.Automata
{
    public abstract class ModuleState<TM, TS>
    {
        public bool IsCompleted { get; protected set; }
        public virtual void OnEnter(TM module) { }

        public abstract string GetName();
        public abstract TS Update(TM weapon, TimeSpan deltaT, Entity owner, World world);
    }
}