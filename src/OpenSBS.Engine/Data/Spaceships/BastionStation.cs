using OpenSBS.Engine.Data.Modules;
using OpenSBS.Engine.Models;

namespace OpenSBS.Engine.Data.Spaceships
{
    [DataEntry(
        DataEntryCategory.Spaceship,
        "Bastion-class Station",
        Description = "A heavy defense station mainly deployed in outer sectors"
    )]
    public class BastionStation : Entity
    {
        public BastionStation(string id, string name, string callSign) : base(
            id, EntityType.Station, name, callSign
        )
        {
            Mass = 100000000;
            Size = 1000;

            Modules.Add(new SmallRadarSensors("radar1"));
        }
    }
}
