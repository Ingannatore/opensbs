using System;

namespace OpenSBS.Engine.Modules.Shields
{
    public class ShieldSector
    {
        public string Side { get; protected set; }
        public int Capacity { get; protected set; }
        public int CurrentCapacity { get; protected set; }
        public int Calibration { get; protected set; }
        public int BaseRechargeRate { get; protected set; }
        public int CurrentRechargeRate { get; protected set; }

        public ShieldSector(string side, int capacity, int rechargeRate)
        {
            Side = side;
            Capacity = capacity;
            CurrentCapacity = new Random().Next(10, 100);
            Calibration = 3;
            BaseRechargeRate = rechargeRate;
            CurrentRechargeRate = rechargeRate;
        }

        public void SetCalibration(int value, int availableCalibrationPoints)
        {
            if (value - Calibration > availableCalibrationPoints)
            {
                return;
            }

            Calibration = value;
            UpdateCurrentRechargeRate();
        }

        public void ResetCalibration(int value = 3)
        {
            Calibration = value;
            UpdateCurrentRechargeRate();
        }

        public void Update()
        {
            if (CurrentCapacity < Capacity)
            {
                CurrentCapacity = Math.Min(CurrentCapacity + CurrentRechargeRate, Capacity);
            }
        }

        private void UpdateCurrentRechargeRate()
        {
            CurrentRechargeRate = (int)Math.Round(BaseRechargeRate * GetCalibrationFactor());
        }

        private double GetCalibrationFactor()
        {
            return Calibration switch
            {
                5 => 1.75,
                4 => 1.5,
                2 => 0.5,
                1 => 0.25,
                _ => 1
            };
        }
    }
}
