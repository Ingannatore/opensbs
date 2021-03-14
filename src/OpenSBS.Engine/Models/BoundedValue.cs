namespace OpenSBS.Engine.Models
{
    public class BoundedValue
    {
        public int Max { get; }
        public int Current { get; }

        public BoundedValue(int value)
        {
            Max = Current = value;
        }
    }
}
