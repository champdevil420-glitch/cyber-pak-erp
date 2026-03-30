"use client";
import React, { useState, useEffect } from "react";
import { ArrowDownLeft, ArrowUpRight, Package, Truck, Landmark } from "lucide-react";

interface Entry {
  id: number;
  date: string;
  desc: string;
  amount: number; 
  currency: string;
  type: "Debit" | "Credit";
  movement: "Inward" | "Outward" | "None";
  account: string;
}

export default function FinancialsPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [mounted, setMounted] = useState(false);
  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState("");
  const [move, setMove] = useState<"Inward" | "Outward" | "None">("None");

  useEffect(() => {
    setMounted(true);
    // This key "cyberPak_entries" must be consistent
    const saved = localStorage.getItem("cyberPak_entries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !amt) return;

    const newEntry: Entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB'),
      desc,
      amount: parseFloat(amt),
      currency: "PKR",
      type: move === "Inward" ? "Debit" : "Credit",
      movement: move,
      account: "General",
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("cyberPak_entries", JSON.stringify(updated));
    setDesc(""); setAmt(""); setMove("None");
  };

  if (!mounted) return null;

  const totalInward = entries.filter(e => e.movement === "Inward").reduce((a, b) => a + b.amount, 0);
  const totalOutward = entries.filter(e => e.movement === "Outward").reduce((a, b) => a + b.amount, 0);

  return (
    <div className="p-8 md:p-12 min-h-screen bg-black text-white font-mono">
      <h2 className="text-xl font-black uppercase italic mb-8 border-l-4 border-emerald-500 pl-4">Financial & Stock Ledger</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-900/50 border border-emerald-500/20 p-6 rounded-3xl">
            <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-2">Total Inward</span>
            <p className="text-2xl font-black text-emerald-500">Rs. {totalInward.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-900/50 border border-red-500/20 p-6 rounded-3xl">
            <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-2">Total Outward</span>
            <p className="text-2xl font-black text-red-500">Rs. {totalOutward.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-900/50 border border-blue-500/20 p-6 rounded-3xl">
            <span className="text-[10px] font-bold text-zinc-500 uppercase block mb-2">Current Balance</span>
            <p className="text-2xl font-black text-blue-400">Rs. {(totalInward - totalOutward).toLocaleString()}</p>
        </div>
      </div>

      <form onSubmit={addEntry} className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800 mb-12 grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        <div>
            <label className="text-[8px] font-black text-zinc-600 uppercase mb-2 block">Order Description</label>
            <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. Leather Shipment" className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-xs outline-none focus:border-emerald-500" />
        </div>
        <div>
            <label className="text-[8px] font-black text-zinc-600 uppercase mb-2 block">Value (PKR)</label>
            <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="0.00" className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-xs outline-none" />
        </div>
        <div>
            <label className="text-[8px] font-black text-zinc-600 uppercase mb-2 block">Movement</label>
            <select value={move} onChange={(e) => setMove(e.target.value as any)} className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-xs outline-none">
              <option value="None">Finance Only</option>
              <option value="Inward">Inward (Stock In)</option>
              <option value="Outward">Outward (Stock Out)</option>
            </select>
        </div>
        <button type="submit" className="bg-emerald-600 text-white p-4 rounded-xl font-black uppercase text-[10px] hover:bg-emerald-500 transition-all">Post Record</button>
      </form>

      <div className="space-y-3">
         {entries.map(e => (
           <div key={e.id} className="flex items-center justify-between p-5 bg-zinc-900/20 rounded-2xl border border-zinc-800">
              <div className="flex gap-4 items-center">
                    <div className={`p-3 rounded-xl ${e.movement === "Inward" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                        {e.movement === "Inward" ? <Truck size={18}/> : <Package size={18}/>}
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase">{e.desc}</p>
                        <p className="text-[8px] text-zinc-700 font-bold uppercase tracking-widest">{e.date}</p>
                    </div>
              </div>
              <p className={`text-sm font-black ${e.movement === "Inward" ? "text-emerald-500" : "text-red-500"}`}>
                {e.movement === "Inward" ? "+" : "-"} Rs. {e.amount.toLocaleString()}
              </p>
           </div>
         ))}
      </div>
    </div>
  );
}