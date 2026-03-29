"use client";
import React, { useState, useEffect } from "react";

// Standardizing the Data Shape
interface Entry {
  id: number;
  date: string;
  desc: string;
  amount: number; 
  originalAmount?: number;
  currency: string;
  type: "Debit" | "Credit";
  account: string;
  isTaxable: boolean;
}

export default function GlobalAccountingSuite() {
  const [activeTab, setActiveTab] = useState("journal");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const exchangeRate = { USD: 278.50, EUR: 301.20 };
  const taxRate = 18;

  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState("");
  const [curr, setCurr] = useState("PKR");
  const [acc, setAcc] = useState("Cash");
  const [type, setType] = useState<"Debit" | "Credit">("Debit");
  const [isTax, setIsTax] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cyberPak_enterprise_acc");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !amt) return;
    
    const rawAmt = parseFloat(amt);
    let pkrValue = rawAmt;
    if (curr === "USD") pkrValue = rawAmt * exchangeRate.USD;
    if (curr === "EUR") pkrValue = rawAmt * exchangeRate.EUR;

    const newEntry: Entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-GB'),
      desc,
      amount: pkrValue,
      originalAmount: rawAmt,
      currency: curr,
      type,
      account: acc,
      isTaxable: isTax
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("cyberPak_enterprise_acc", JSON.stringify(updated));
    setDesc(""); setAmt(""); setIsTax(false);
  };

  if (!mounted) return null;

  return (
    <div className="p-6 md:p-10 min-h-screen bg-black text-white font-mono">
      {/* Header Stats */}
      <div className="flex flex-wrap gap-4 mb-8 bg-zinc-900 border border-zinc-800 p-4 rounded-xl items-center justify-between">
        <div className="flex gap-6 items-center">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Rate: <span className="text-white">$1 = {exchangeRate.USD} PKR</span>
            </div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-l border-zinc-800 pl-6">
                GST: <span className="text-white">{taxRate}%</span>
            </div>
        </div>
        <div className="flex gap-2">
            {["journal", "tax"].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${activeTab === t ? "bg-white text-black" : "text-zinc-500 hover:bg-zinc-800"}`}>
                    {t}
                </button>
            ))}
        </div>
      </div>

      {activeTab === "journal" && (
        <div className="space-y-8">
          <form onSubmit={addEntry} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="md:col-span-1">
                <label className="text-[8px] font-bold text-zinc-500 uppercase mb-2 block">Description</label>
                <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Export Order" className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-xs outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="text-[8px] font-bold text-zinc-500 uppercase mb-2 block">Value & Currency</label>
                <div className="flex bg-black border border-zinc-800 rounded-lg overflow-hidden">
                    <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="0" className="w-full bg-transparent p-3 text-xs outline-none font-bold" />
                    <select value={curr} onChange={(e) => setCurr(e.target.value)} className="bg-zinc-800 text-[10px] p-2 outline-none">
                        <option value="PKR">PKR</option>
                        <option value="USD">USD</option>
                    </select>
                </div>
              </div>
              <div>
                <label className="text-[8px] font-bold text-zinc-500 uppercase mb-2 block">Ledger Account</label>
                <select value={acc} onChange={(e) => setAcc(e.target.value)} className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-xs outline-none">
                  <option value="Cash">Cash</option>
                  <option value="Inventory">Inventory</option>
                  <option value="Revenue">Revenue</option>
                </select>
              </div>
              <div>
                <label className="text-[8px] font-bold text-zinc-500 uppercase mb-2 block">Tax</label>
                <button type="button" onClick={() => setIsTax(!isTax)} className={`w-full p-3 rounded-lg border text-[10px] font-bold uppercase ${isTax ? "border-amber-500 text-amber-500" : "border-zinc-800 text-zinc-600"}`}>
                    {isTax ? "Tax ON" : "No Tax"}
                </button>
              </div>
              <button type="submit" className="bg-emerald-600 text-white p-3 rounded-lg font-bold uppercase text-[10px] hover:bg-emerald-500 transition-all">Post Entry</button>
            </div>
          </form>

          {/* List of Entries */}
          <div className="space-y-2">
             {entries.map(e => (
               <div key={e.id} className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-xl border border-zinc-800 hover:border-emerald-500/50 transition-all">
                  <div>
                        <p className="text-xs font-bold uppercase">{e.desc}</p>
                        <p className="text-[8px] text-zinc-600 uppercase">{e.date} // {e.account} {e.currency !== "PKR" && `(Fixed: ${e.originalAmount} ${e.currency})`}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">Rs. {e.amount.toLocaleString()}</p>
                    {e.isTaxable && <p className="text-[7px] font-bold text-amber-500 uppercase">FBR GST Ready</p>}
                  </div>
               </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
}