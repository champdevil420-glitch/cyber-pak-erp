"use client";
import React, { useState, useEffect } from "react";
import { ArrowDownLeft, ArrowUpRight, Package, Truck, Database } from "lucide-react";

interface Entry {
  id: number;
  date: string;
  desc: string;
  amount: number; 
  currency: string;
  type: "Debit" | "Credit";
  movement: "Inward" | "Outward" | "None"; // New Field
  account: string;
}

export default function GlobalAccountingSuite() {
  const [activeTab, setActiveTab] = useState("journal");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState("");
  const [move, setMove] = useState<"Inward" | "Outward" | "None">("None");
  const [acc, setAcc] = useState("Inventory");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cyberPak_enterprise_acc");
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
      account: acc,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("cyberPak_enterprise_acc", JSON.stringify(updated));
    setDesc(""); setAmt(""); setMove("None");
  };

  if (!mounted) return null;

  // Inventory Logic
  const totalInward = entries.filter(e => e.movement === "Inward").reduce((a, b) => a + b.amount, 0);
  const totalOutward = entries.filter(e => e.movement === "Outward").reduce((a, b) => a + b.amount, 0);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-black text-white font-mono">
      
      {/* 📊 Stock Movement Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-zinc-900 border border-emerald-500/20 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Inward (Stock In)</span>
                <ArrowDownLeft className="text-emerald-500" size={18} />
            </div>
            <p className="text-2xl font-black italic">Rs. {totalInward.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-900 border border-red-500/20 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Outward (Stock Out)</span>
                <ArrowUpRight className="text-red-500" size={18} />
            </div>
            <p className="text-2xl font-black italic">Rs. {totalOutward.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-900 border border-blue-500/20 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Net Inventory Value</span>
                <Package className="text-blue-500" size={18} />
            </div>
            <p className="text-2xl font-black italic text-blue-400">Rs. {(totalInward - totalOutward).toLocaleString()}</p>
        </div>
      </div>

      {/* 📝 Entry Form */}
      <form onSubmit={addEntry} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-[8px] font-bold text-zinc-500 uppercase mb-2 block">Item/Order Description</label>
            <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. Leather Shipment" className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-xs outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="text-[8px] font-bold text-zinc-500 uppercase mb-2 block">Value (PKR)</label>
            <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="0.00" className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-xs outline-none" />
          </div>
          <div>
            <label className="text-[8px] font-bold text-zinc-500 uppercase mb-2 block">Movement Type</label>
            <select value={move} onChange={(e) => setMove(e.target.value as any)} className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-xs outline-none">
              <option value="None">Finance Only</option>
              <option value="Inward">Inward (Purchase/Return)</option>
              <option value="Outward">Outward (Sale/Dispatch)</option>
            </select>
          </div>
          <button type="submit" className="bg-white text-black p-3 rounded-lg font-bold uppercase text-[10px] hover:bg-zinc-200 transition-all">Record Movement</button>
        </div>
      </form>

      {/* 📋 Live Movement Ledger */}
      <div className="space-y-2">
         {entries.map(e => (
           <div key={e.id} className="flex items-center justify-between p-4 bg-zinc-900/20 rounded-xl border border-zinc-800">
              <div className="flex gap-4 items-center">
                    <div className={`p-2 rounded-lg ${e.movement === "Inward" ? "bg-emerald-500/10 text-emerald-500" : e.movement === "Outward" ? "bg-red-500/10 text-red-500" : "bg-zinc-800 text-zinc-400"}`}>
                        {e.movement === "Inward" ? <Truck size={16}/> : e.movement === "Outward" ? <Database size={16}/> : <Package size={16}/>}
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase">{e.desc}</p>
                        <p className="text-[8px] text-zinc-600 uppercase">{e.date} // {e.movement || "Financial Record"}</p>
                    </div>
              </div>
              <p className={`text-sm font-bold ${e.movement === "Inward" ? "text-emerald-500" : "text-red-500"}`}>
                {e.movement === "Inward" ? "+" : "-"} Rs. {e.amount.toLocaleString()}
              </p>
           </div>
         ))}
      </div>
    </div>
  );
}