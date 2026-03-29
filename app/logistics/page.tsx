"use client";
import { useState } from "react";
import { Truck, Anchor, Plane, MapPin, CheckCircle2, AlertCircle } from "lucide-react";

export default function LogisticsPage() {
  const [shipments, setShipments] = useState([
    { id: "SH-4401", client: "EuroSports", destination: "Hamburg, DE", mode: "Sea", status: "In Transit", eta: "April 12" },
    { id: "SH-4402", client: "Apex USA", destination: "New York, US", mode: "Air", status: "Port Clearance", eta: "March 30" },
  ]);

  return (
    <div className="p-8 md:p-16 min-h-screen bg-black text-emerald-400 font-mono text-[13px]">
      <div className="flex justify-between items-end mb-12 border-b border-emerald-500/10 pb-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
            Logistics <span className="text-cyan-400">& Shipping</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-2">Export Tracking // Dry Port Sync</p>
        </div>
        <div className="text-right">
            <p className="text-[9px] text-slate-500 uppercase font-black">Active Containers</p>
            <p className="text-2xl font-black text-white italic">0{shipments.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {shipments.map((ship) => (
          <div key={ship.id} className="bg-slate-900/10 border border-slate-800 p-8 rounded-3xl group hover:border-cyan-400/20 transition-all">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              
              {/* Info Side */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-black rounded border border-slate-800">
                    {ship.mode === "Sea" ? <Anchor size={20} className="text-cyan-400" /> : <Plane size={20} className="text-cyan-400" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase">{ship.id}</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{ship.client} • {ship.destination}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-6">
                    <MapPin size={12} className="text-emerald-500 animate-bounce" />
                    <span className="text-[10px] text-white font-black uppercase tracking-widest">Current Location: Sialkot Dry Port</span>
                </div>
              </div>

              {/* Status Side */}
              <div className="md:w-64 flex flex-col justify-between">
                <div className="bg-black/50 p-4 rounded-xl border border-slate-800 text-center">
                    <p className="text-[8px] text-slate-600 uppercase font-black mb-1">Status</p>
                    <p className="text-emerald-500 font-black italic uppercase tracking-tighter">{ship.status}</p>
                </div>
                <div className="mt-4 flex justify-between items-center text-[10px]">
                    <span className="text-slate-600 font-bold uppercase tracking-widest">ETA Arrival:</span>
                    <span className="text-white font-black">{ship.eta}</span>
                </div>
              </div>

            </div>
            
            {/* Visual Route */}
            <div className="mt-8 pt-8 border-t border-slate-900 flex items-center justify-between text-[8px] font-black text-slate-700 uppercase tracking-[0.2em]">
                <span className="text-emerald-500">Factory</span>
                <div className="flex-1 h-[1px] bg-slate-800 mx-4 relative">
                    <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-cyan-400 rounded-full -translate-y-1/2 shadow-[0_0_10px_cyan]" />
                </div>
                <span>Port</span>
                <div className="flex-1 h-[1px] bg-slate-800 mx-4" />
                <span>Destination</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}