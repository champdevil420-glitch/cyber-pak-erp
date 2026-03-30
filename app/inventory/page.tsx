"use client";
import React, { useState, useEffect } from "react";
import { 
  Package, ArrowDownLeft, ArrowUpRight, 
  Database, History, Search, Filter, 
  Trash2, Download, CheckCircle2 
} from "lucide-react";

export default function InventoryMaster() {
  const [mounted, setMounted] = useState(false);
  const [movement, setMovement] = useState<any[]>([]);
  const [form, setForm] = useState({ 
    itemName: "", 
    quantity: "", 
    type: "Inward", 
    batch: "", 
    unit: "Pcs" 
  });

  // Load Data
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cyberPak_inventory_v3");
    if (saved) setMovement(JSON.parse(saved));
  }, []);

  // Save Data
  const updateStorage = (newList: any[]) => {
    setMovement(newList);
    localStorage.setItem("cyberPak_inventory_v3", JSON.stringify(newList));
  };

  const handleLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.itemName || !form.quantity) return;

    const newLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleString('en-GB', { 
        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
      }),
      ...form,
      quantity: parseInt(form.quantity)
    };

    updateStorage([newLog, ...movement]);
    setForm({ ...form, itemName: "", quantity: "", batch: "" });
  };

  const deleteLog = (id: number) => {
    const filtered = movement.filter(item => item.id !== id);
    updateStorage(filtered);
  };

  // Calculations
  const totalIn = movement.filter(m => m.type === "Inward").reduce((a, b) => a + b.quantity, 0);
  const totalOut = movement.filter(m => m.type === "Outward").reduce((a, b) => a + b.quantity, 0);
  const currentStock = totalIn - totalOut;

  if (!mounted) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      
      {/* HEADER & ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 bg-zinc-900/40 border border-white/5 p-6 rounded-[2rem] flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Live Floor Inventory</p>
            <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">
              {currentStock.toLocaleString()} <span className="text-xs text-zinc-600 not-italic">Units</span>
            </h2>
          </div>
          <Database size={40} className="text-cyan-500/20" />
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-[2rem] flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-xl"><ArrowDownLeft className="text-emerald-500" size={20} /></div>
          <div>
            <p className="text-[8px] font-black text-zinc-500 uppercase">Total Inward</p>
            <p className="text-lg font-black text-emerald-400">{totalIn}</p>
          </div>
        </div>

        <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-[2rem] flex items-center gap-4">
          <div className="p-3 bg-red-500/20 rounded-xl"><ArrowUpRight className="text-red-500" size={20} /></div>
          <div>
            <p className="text-[8px] font-black text-zinc-500 uppercase">Total Outward</p>
            <p className="text-lg font-black text-red-400">{totalOut}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* INPUT PANEL */}
        <div className="lg:col-span-1 space-y-4">
          <form onSubmit={handleLog} className="bg-zinc-900/60 border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Package size={80} /></div>
            
            <h3 className="text-xs font-black uppercase italic mb-6 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-cyan-500" /> Log Goods Movement
            </h3>

            <div className="space-y-4 relative z-10">
              <div>
                <label className="text-[8px] font-black uppercase text-zinc-500 ml-2 mb-1 block">Product / Material Name</label>
                <input 
                  required
                  placeholder="e.g. S/S FORCEPS 6 INCH"
                  className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-[11px] font-bold uppercase focus:border-cyan-500 outline-none transition-all"
                  value={form.itemName}
                  onChange={e => setForm({...form, itemName: e.target.value.toUpperCase()})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[8px] font-black uppercase text-zinc-500 ml-2 mb-1 block">Quantity</label>
                  <input 
                    required
                    type="number"
                    placeholder="00"
                    className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-[11px] font-bold outline-none"
                    value={form.quantity}
                    onChange={e => setForm({...form, quantity: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[8px] font-black uppercase text-zinc-500 ml-2 mb-1 block">Batch/Lot #</label>
                  <input 
                    placeholder="B-202"
                    className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-[11px] font-bold uppercase outline-none"
                    value={form.batch}
                    onChange={e => setForm({...form, batch: e.target.value.toUpperCase()})}
                  />
                </div>
              </div>

              <div className="flex bg-black p-1 rounded-2xl border border-zinc-800">
                <button 
                  type="button" 
                  onClick={() => setForm({...form, type: 'Inward'})}
                  className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${form.type === 'Inward' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-zinc-600'}`}
                >
                  Inward (Receiving)
                </button>
                <button 
                  type="button" 
                  onClick={() => setForm({...form, type: 'Outward'})}
                  className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${form.type === 'Outward' ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' : 'text-zinc-600'}`}
                >
                  Outward (Dispatch)
                </button>
              </div>

              <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-cyan-400 hover:scale-[1.02] transition-all active:scale-95 mt-4">
                Commit Movement to Ledger
              </button>
            </div>
          </form>
        </div>

        {/* LEDGER TABLE */}
        <div className="lg:col-span-2 bg-zinc-900/20 border border-white/5 rounded-[2.5rem] flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-3">
              <History size={16} className="text-zinc-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Movement History</span>
            </div>
            <button 
              onClick={() => { if(window.confirm('Clear all logs?')) updateStorage([]); }}
              className="text-[8px] font-black text-zinc-600 hover:text-red-500 uppercase transition-all"
            >
              Reset Terminal
            </button>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[500px] no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#0a0a0a] text-[8px] font-black text-zinc-600 uppercase border-b border-white/5 z-10">
                <tr>
                  <th className="p-5">Timestamp</th>
                  <th className="p-5">Item / Batch</th>
                  <th className="p-5">Action</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-center">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {movement.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-20 text-center text-[10px] font-bold text-zinc-700 uppercase italic">
                      No material movements detected in current session.
                    </td>
                  </tr>
                )}
                {movement.map((log) => (
                  <tr key={log.id} className="group hover:bg-white/5 transition-all">
                    <td className="p-5 text-[10px] text-zinc-500 font-mono">{log.timestamp}</td>
                    <td className="p-5">
                      <p className="text-[11px] font-black text-white leading-none">{log.itemName}</p>
                      <p className="text-[8px] text-zinc-600 font-bold mt-1 uppercase">Batch: {log.batch || 'GENERAL'}</p>
                    </td>
                    <td className="p-5">
                      <span className={`text-[8px] font-black px-2 py-1 rounded border uppercase tracking-tighter
                        ${log.type === 'Inward' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' : 'text-red-500 border-red-500/20 bg-red-500/5'}`}>
                        {log.type}
                      </span>
                    </td>
                    <td className={`p-5 text-right font-black text-xs ${log.type === 'Inward' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {log.type === 'Inward' ? '+' : '-'}{log.quantity.toLocaleString()}
                    </td>
                    <td className="p-5 text-center">
                      <button onClick={() => deleteLog(log.id)} className="text-zinc-800 hover:text-red-500 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}