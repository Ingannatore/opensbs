namespace OpenSBS.Core.Utils
{
    internal class ValueBag
    {
        public double Current { get; private set; }
        public double Maximum { get; private set; }

        public ValueBag(double maximum): this(maximum, maximum) { }

        public ValueBag(double current, double maximum)
        {
            Current = current;
            Maximum = maximum;
        }

        public void Set(double value)
        {
            Current = Math.Clamp(value, 0, Maximum);
        }
    }
}
