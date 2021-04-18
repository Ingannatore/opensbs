namespace OpenSBS.Engine.Models
{
    public class Counter
    {
        public double Target { get; private set; }
        public double Current { get; private set; }
        public double Ratio => Target > 0 ? Current / Target : 0;
        public bool IsCompleted => Current >= Target;

        public Counter()
        {
            Current = 0;
            Target = 0;
        }

        public void Reset(double target, double current = 0)
        {
            Target = target;
            Current = current;
        }

        public void Increment(double value)
        {
            Current += value;
        }
    }
}
