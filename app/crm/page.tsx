"use client";
import { useState } from "react";
import { Globe, UserPlus, Mail, Phone, ExternalLink, Search, Star } from "lucide-react";

export default function CRMPage() {
  const [clients, setClients] = useState([
    { id: "CL-001", name: "EuroSports GmbH", country: "Germany", status: "VIP", totalOrders: 12, email: "procurement@eurosports.de" },
    { id: "CL-002", name: "Apex Athletics", country: "USA", status: "Active", totalOrders: 5, email: "orders@apex.com" },
    { id: "CL-003", name: "London Gear Ltd", country: "UK", status: "Pending", totalOrders: 1, email: "info@londongear.co.uk" },
  ]);

  return (
    <div className="p-8 md:p-16 min-h-screen bg-black text-emerald-400 font-mono text-[13px]">
      <div className="flex justify-between items-end mb-12 border-b border-emerald-500/10 pb-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
            Client <span className="text-cyan-400">Relations</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-2">Export Portfolio // International Accounts</p>
        </div>
        <button className="bg-cyan-500 text-black px-6 py-2 rounded-lg font-black text-[10px] flex items-center gap-2 hover:bg-white transition-all uppercase shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            <UserPlus size={16} /> Add Global Client
        </button>
      </div>

      {/* --- SEARCH & FILTERS --- */}
      <div className="relative mb-8">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
        <input 
          placeholder="Filter by Country, Name, or Account ID..." 
          className="w-full bg-[#050505] border border-slate-800 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-cyan-400 transition-all text-white"
        />
      </div>

      {/* --- CLIENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-slate-900/20 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/30 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-black border border-slate-800 rounded-lg flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors">{client.name}</h3>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">{client.country} // {client.id}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                client.status === 'VIP' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500'
              }`}>
                {client.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-black/40 p-3 rounded-lg border border-slate-800/50">
                <p className="text-[8px] text-slate-600 uppercase font-black mb-1">Lifetime Orders</p>
                <p className="text-white font-bold">{client.totalOrders} Invoices</p>
              </div>
              <div className="bg-black/40 p-3 rounded-lg border border-slate-800/50">
                <p className="text-[8px] text-slate-600 uppercase font-black mb-1">Contact Channel</p>
                <p className="text-white font-bold truncate">Direct Mail</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-slate-800/50 hover:bg-slate-700 p-2 rounded text-[9px] font-black uppercase flex items-center justify-center gap-2 transition-all">
                <Mail size={12} /> Email
              </button>
              <button className="flex-1 bg-slate-800/50 hover:bg-slate-700 p-2 rounded text-[9px] font-black uppercase flex items-center justify-center gap-2 transition-all">
                <ExternalLink size={12} /> Dossier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}