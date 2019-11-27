﻿using System;
using OpenSBS.Engine.Messages;

namespace OpenSBS.Engine.Entities
{
    public abstract class Module : IModule
    {
        protected ArtificialEntity Owner;
        public string Id { get; }
        public string Type { get; }

        protected Module(string id, string type)
        {
            Id = id;
            Type = type;
        }

        public Module SetOwner(ArtificialEntity entity)
        {
            Owner = entity;

            return this;
        }

        public abstract void Update(TimeSpan timeSpan);
        public abstract void HandleMessage(Message message);
    }
}