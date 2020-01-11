using OpenSBS.Data.Modules;
using OpenSBS.Engine.Entities;

namespace OpenSBS.Data.Ships
{
    public class Ship : ArtificialEntity
    {
        public Ship(string id, string name) : base(id, name, "ship.cruiser", 100)
        {
            SetMass(1000);
            SetSize(50);
            AddModule(new ManoeuvreEnginesModule("manoeuvre-engines-1"));
        }
    }
}
