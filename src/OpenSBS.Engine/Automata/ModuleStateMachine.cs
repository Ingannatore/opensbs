﻿using System;
using System.Collections.Generic;
using OpenSBS.Engine.Models.Entities;
using OpenSBS.Engine.Models.Modules;

namespace OpenSBS.Engine.Automata
{
    public class ModuleStateMachine<TM, TS> where TM : IModule where TS : ModuleState<TM, TS>
    {
        public TS Current => _states.Peek();

        private readonly TM _module;
        private readonly Stack<TS> _states;

        public ModuleStateMachine(TM module, TS initialState)
        {
            _module = module;
            _states = new Stack<TS>();

            PushState(initialState);
        }

        public void Update(TimeSpan deltaT, Entity owner, World world)
        {
            if (_states.Peek().IsCompleted)
            {
                PopState();
            }

            var nextState = _states.Peek().Update(_module, deltaT, owner, world);
            PushState(nextState);
        }

        public void PushState(TS state)
        {
            if (state == null)
            {
                return;
            }

            _states.Push(state);
            state.OnEnter(_module);
        }

        private void PopState()
        {
            _states.Pop();
            _states.Peek().OnEnter(_module);
        }
    }
}
