namespace OpenSBS.Engine.Models
{
    public class CountdownTimer
    {
        public double Current { get; private set; }
        public double Original { get; private set; }
        public double Ratio { get; private set; }
        public bool IsCompleted => Current <= 0;

        public CountdownTimer()
        {
            Current = 0;
            Original = 0;
            Ratio = 0;
        }

        public void Reset(double value)
        {
            Current = value;
            Original = value;
            Ratio = 0;
        }

        public void Advance(double deltaT)
        {
            Current -= deltaT;
            Ratio = Original > 0 ? (Original - Current) / Original : 0;
        }
    }
}
