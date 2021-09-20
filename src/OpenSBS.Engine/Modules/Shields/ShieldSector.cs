using System;

namespace OpenSBS.Engine.Modules.Shields
{
    public class ShieldSector
    {
        private readonly int _baseCapacity;
        private readonly int _baseRechargeRate;

        public string Side { get; }
        public int Capacity { get; protected set; }
        public int Calibration { get; protected set; }
        public int RechargeRate { get; protected set; }
        public double Ratio { get; protected set; }

        public ShieldSector(string side, int capacity, int rechargeRate)
        {
            Side = side;
            Capacity = new Random().Next(10, 100);
            Calibration = 3;
            RechargeRate = rechargeRate;
            Ratio = Capacity / (double)capacity;

            _baseCapacity = capacity;
            _baseRechargeRate = rechargeRate;
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
            if (Capacity < _baseCapacity)
            {
                Capacity = Math.Min(Capacity + RechargeRate, _baseCapacity);
                Ratio = Capacity / (double)_baseCapacity;
            }
        }

        private void UpdateCurrentRechargeRate()
        {
            RechargeRate = (int)Math.Round(_baseRechargeRate * GetCalibrationFactor());
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
