"use client";
import { useState } from "react";
import { Box, AlertTriangle, ArrowDown, ArrowUp, Truck, Users, Package, Search } from "lucide-react";

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("stock"); // 'stock' or 'suppliers'

  const [items] = useState([
    { id: "MAT-001", name: "Premium Cow Leather", qty: 450, unit: "sq ft", status: "In Stock" },
    { id: "MAT-002", name: "Synthetic Thread", qty: 12, unit: "spools", status: "Low Stock" },
  ]);

  const [suppliers] = useState([
    { id: "SUP-101", name: "Sialkot Tannery Hub", category: "Raw Leather", leadTime: "3-5 Days", rating: "98%" },
    { id: "SUP-102", name: "Pak-Global Chemicals", category: "Dyes & Finishing", leadTime: "2 Days", rating: "92%" },
    { id: "SUP-103", name: "Threads & Co.", category: "Hardware", leadTime: "1 Day", rating: "100%" },
  ]);

  return (
    <div className="p-8 md:p-16 min-h-screen bg-black text-emerald-400 font-mono text-[13px]">
      <div className="flex justify-between items-end mb-8 border-b border-emerald-500/10 pb-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
            Warehouse <span className="text-cyan-400">& Suppliers</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-2">Resource Management // Procurement Hub</p>
        </div>
        <div className="flex gap-2 bg-[#050505] p-1 rounded-xl border border-slate-800">
            <button 
                onClick={() => setActiveTab("stock")}
                className={`px-4 py-2 rounded-lg font-black text-[9px] uppercase transition-all ${activeTab === 'stock' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-white'}`}
            >
                Material Stock
            </button>
            <button 
                onClick={() => setActiveTab("suppliers")}
                className={`px-4 py-2 rounded-lg font-black text-[9px] uppercase transition-all ${activeTab === 'suppliers' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white'}`}
            >
                Vendor Directory
            </button>
        </div>
      </div>

      {activeTab === "stock" ? (
        <div className="animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl flex items-center gap-4">
                <AlertTriangle className="text-amber-500" />
                <div>
                    <p className="text-[8px] text-slate-500 uppercase font-black">Refill Needed</p>
                    <p className="text-sm font-bold text-white italic">02 Items Below Limit</p>
                </div>
            </div>
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-4">
                <Package className="text-emerald-500" />
                <div>
                    <p className="text-[8px] text-slate-500 uppercase font-black">Total Materials</p>
                    <p className="text-sm font-bold text-white italic">84 SKUs Active</p>
                </div>
            </div>
          </div>

          <div className="bg-[#050505] border border-slate-800 rounded-3xl overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-slate-900/30 text-slate-500 uppercase text-[9px] font-black tracking-widest border-b border-slate-800">
                    <tr>
                        <th className="p-6">Material ID</th>
                        <th className="p-6">Description</th>
                        <th className="p-6 text-center">Qty</th>
                        <th className="p-6">Status</th>
                        <th className="p-6 text-right">Adjust</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/50">
                    {items.map((item) => (
                        <tr key={item.id} className="hover:bg-emerald-500/[0.02] transition-colors">
                            <td className="p-6 text-cyan-400 font-bold">{item.id}</td>
                            <td className="p-6 text-white font-black italic uppercase">{item.name}</td>
                            <td className="p-6 text-center text-white font-bold">{item.qty} {item.unit}</td>
                            <td className="p-6">
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${item.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td className="p-6 text-right flex justify-end gap-1">
                                <button className="p-2 hover:bg-slate-800 rounded text-emerald-500"><ArrowUp size={14} /></button>
                                <button className="p-2 hover:bg-slate-800 rounded text-red-500"><ArrowDown size={14} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliers.map((sup) => (
              <div key={sup.id} className="bg-[#050505] border border-slate-800 p-6 rounded-2xl group hover:border-cyan-400/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-black rounded-lg border border-slate-800 text-cyan-400">
                    <Truck size={20} />
                  </div>
                  <span className="text-[10px] text-emerald-500 font-black uppercase">{sup.rating} Reliability</span>
                </div>
                <h3 className="text-white font-black uppercase text-lg italic">{sup.name}</h3>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mb-6">{sup.category} // {sup.id}</p>
                
                <div className="grid grid-cols-2 gap-4 text-[9px] uppercase font-black tracking-widest text-slate-600 mb-6">
                  <div>
                    <p className="mb-1">Lead Time</p>
                    <p className="text-white">{sup.leadTime}</p>
                  </div>
                  <div>
                    <p className="mb-1">Terms</p>
                    <p className="text-white text-[8px]">NET-30</p>
                  </div>
                </div>
                <button className="w-full bg-slate-900 py-3 rounded-lg text-[10px] font-black uppercase border border-slate-800 hover:border-cyan-400 transition-all text-white">
                  Place Material Order
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}