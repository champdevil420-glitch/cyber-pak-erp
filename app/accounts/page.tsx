"use client";
import React, { useState, useEffect } from "react";
import { ArrowDownLeft, ArrowUpRight, Package, Truck, RefreshCw } from "lucide-react";

export default function FinancialsPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState("");
  const [move, setMove] = useState<"Inward" | "Outward" | "None">("None");

  useEffect(() => {
    setMounted(true);
    syncData();
  }, []);

  const syncData = () => {
    // This checks ALL possible old storage names to find your items
    const v1 = localStorage.getItem("cyberPak_enterprise_acc");
    const v2 = localStorage.getItem("cyberPak_entries");
    const combined = v2 ? JSON.parse(v2) : (v1 ? JSON.parse(v1) : []);
    setEntries(combined);
    localStorage.setItem("cyberPak_entries", JSON.stringify(combined));
  };

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !amt) return;
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB'),
      desc,
      amount: parseFloat(amt),
      movement: move,
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("cyberPak_entries", JSON.stringify(updated));
    setDesc(""); setAmt("");
  };

  if (!mounted) return null;

  return (
    <div className="p-8 md:p-12 min-h-screen bg-black text-white font-mono">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-black uppercase italic border-l-4 border-emerald-500 pl-4">Financial Ledger</h2>
        <button onClick={syncData} className="flex items-center gap-2 text-[10px] bg-zinc-900 p-2 rounded-lg hover:bg-zinc-800 transition-all">
          <RefreshCw size={12} /> SYNC DATA
        </button>
      </div>

      <form onSubmit={addEntry} className="bg-zinc-900/40 p-8 rounded-[2.5rem] border border-zinc-800 mb-12 grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Order Name" className="bg-black border border-zinc-800 rounded-xl p-4 text-xs outline-none" />
        <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="Amount" className="bg-black border border-zinc-800 rounded-xl p-4 text-xs outline-none" />
        <select value={move} onChange={(e) => setMove(e.target.value as any)} className="bg-black border border-zinc-800 rounded-xl p-4 text-xs outline-none">
          <option value="Inward">Inward</option>
          <option value="Outward">Outward</option>
        </select>
        <button type="submit" className="bg-emerald-600 p-4 rounded-xl font-black uppercase text-[10px]">Post</button>
      </form>

      <div className="space-y-3">
         {entries.map(e => (
           <div key={e.id} className="flex items-center justify-between p-5 bg-zinc-900/20 rounded-2xl border border-zinc-800">
              <span className="text-xs font-black uppercase">{e.desc}</span>
              <span className={e.movement === 'Inward' ? 'text-emerald-500' : 'text-red-500'}>Rs. {e.amount.toLocaleString()}</span>
           </div>
         ))}
      </div>
    </div>
  );
}