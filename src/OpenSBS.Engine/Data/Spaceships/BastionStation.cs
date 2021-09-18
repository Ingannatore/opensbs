using OpenSBS.Engine.Data.Modules;
using OpenSBS.Engine.Data.Templates;
using OpenSBS.Engine.Models.Entities;

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
            id, name, callSign, BastionStationTemplate.Instance
        )
        {
            Modules.Add(new SmallRadarSensors("radar1"));
        }
    }
}
