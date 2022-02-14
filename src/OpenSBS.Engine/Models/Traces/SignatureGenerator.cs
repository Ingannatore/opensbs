using System;
using System.Linq;
using OpenSBS.Engine.Utils;

namespace OpenSBS.Engine.Models.Traces
{
    public class SignatureGenerator
    {
        private const string Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private const string Config = "4333222221111111";

        private readonly Random _randomizer;

        public SignatureGenerator(Random randomizer)
        {
            _randomizer = randomizer;
        }

        public string[,] Generate()
        {
            var lettersBag = new RandomBag<char>(_randomizer, Letters.ToList());

            var valuesBag = new RandomBag<string>(_randomizer);
            while (valuesBag.Count < Config.Length)
            {
                var value = GetRandomValue(lettersBag.Draw());
                if (!valuesBag.Contains(value))
                {
                    valuesBag.Add(value);
                }
            }

            var tokensBag = new RandomBag<string>(_randomizer);
            foreach (var configItem in Config)
            {
                tokensBag.Add(
                    valuesBag.Draw(),
                    int.Parse(configItem.ToString())
                );
            }

            var grid = new string[6, 5];
            for (var column = 0; column < 6; column++)
            {
                for (var row = 0; row < 5; row++)
                {
                    grid[column, row] = tokensBag.Draw();
                }
            }

            return grid;
        }

        private string GetRandomValue(char prefix)
        {
            return $"{prefix}{_randomizer.Next(10)}";
        }
    }
}
