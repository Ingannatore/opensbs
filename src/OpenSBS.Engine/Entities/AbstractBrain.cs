namespace OpenSBS.Engine
{
    public class AbstractBrain : IUpdatable
    {
        private AbstractEntity _entity;

        public AbstractBrain(AbstractEntity entity)
        {
            this._entity = entity;
        }

        public void Update()
        {
            this._entity.Update();
        }
    }
}