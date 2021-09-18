namespace OpenSBS.Engine.Modules
{
    public class ModuleTimer
    {
        public double Current { get; private set; }
        public double Max { get; private set; }
        public double Ratio => Max > 0 ? Current / Max : 0;
        public bool IsCompleted => Current >= Max;

        public ModuleTimer()
        {
            Current = 0;
            Max = 0;
        }

        public void Reset(double max, double current = 0)
        {
            Max = max;
            Current = current;
        }

        public void Advance(double deltaT)
        {
            Current += deltaT;
        }
    }
}
