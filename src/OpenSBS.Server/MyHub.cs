using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace OpenSBS.Server
{
    public class MyHub : Hub
    {
        public async Task SetRudder(int value)
        {
            Console.WriteLine($"SetRudder({value})");
        }

        public async Task ResetRudder()
        {
            Console.WriteLine("ResetRudder()");
        }
    }
}
