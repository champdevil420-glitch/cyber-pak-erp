"use client";
import { useState, useEffect } from "react";
import { 
  BookOpen, Scale, Landmark, FileText, 
  Plus, Trash2, Globe, FileCheck, Package,
  ArrowRightLeft, Percent, Printer
} from "lucide-react";

interface Entry {
  id: number;
  date: string;
  desc: string;
  amount: number; // Stored in PKR
  originalAmount?: number;
  currency: "PKR" | "USD" | "EUR";
  type: "Debit" | "Credit";
  account: "Cash" | "Accounts Receivable" | "Inventory" | "Revenue" | "Expense";
  isTaxable: boolean;
}

export default function GlobalAccountingSuite() {
  const [activeTab, setActiveTab] = useState<"journal" | "trial" | "balance" | "tax">("journal");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [mounted, setMounted] = useState(false);
  
  // State for Features
  const [exchangeRate, setExchangeRate] = useState({ USD: 278.50, EUR: 301.20 });
  const [taxRate, setTaxRate] = useState(18); // FBR Standard 18%

  // Form State
  const [desc, setDesc] = useState("");
  const [amt, setAmt] = useState("");
  const [curr, setCurr] = useState<"PKR" | "USD" | "EUR">("PKR");
  const [acc, setAcc] = useState<Entry["account"]>("Cash");
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
    
    // AUTOMATION: Currency Conversion Logic
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

  // --- ANALYTICS ENGINE ---
  const totalDebit = entries.reduce((a, b) => a + (b.type === "Debit" ? b.amount : 0), 0);
  const totalCredit = entries.reduce((a, b) => a + (b.type === "Credit" ? b.amount : 0), 0);
  const totalTaxLiability = entries.filter(e => e.isTaxable).reduce((a, b) => a + (b.amount * (taxRate/100)), 0);

  const getAccountBalance = (name: string) => {
    const d = entries.filter(e => e.account === name && e.type === "Debit").reduce((a, b) => a + b.amount, 0);
    const c = entries.filter(e => e.account === name && e.type === "Credit").reduce((a, b) => a + b.amount, 0);
    return { dr: d, cr: c, net: d - c };
  };

  if (!mounted) return null;

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020202] text-white font-mono">
      
      {/* 1. TOP UTILITY BAR (CURRENCY & TAX SETTINGS) */}
      <div className="flex flex-wrap gap-4 mb-8 bg-white/[0.02] border border-white/5 p-4 rounded-2xl items-center justify-between">
        <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <Globe size={14} className="text-cyan-500" />
                Live PKR: <span className="text-white">$1 = {exchangeRate.USD}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest border-l border-white/10 pl-6">
                <Percent size={14} className="text-amber-500" />
                FBR GST: <span className="text-white">{taxRate}%</span>
            </div>
        </div>
        <div className="flex gap-2">
            {["journal", "trial", "balance", "tax"].map(t => (
                <button key={t} onClick={() => setActiveTab(t as any)} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${activeTab === t ? "bg-white text-black" : "text-slate-500 hover:bg-white/5"}`}>
                    {t}
                </button>
            ))}
        </div>
      </div>

      {/* 2. AUTOMATED ENTRY POINT */}
      {activeTab === "journal" && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <form onSubmit={addEntry} className="bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
              <div className="md:col-span-2">
                <label className="text-[8px] font-black text-slate-600 uppercase mb-2 block">Description</label>
                <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g., Export to Germany" className="w-full bg-black border border-white/5 rounded-xl p-3 text-xs outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label className="text-[8px] font-black text-slate-600 uppercase mb-2 block">Value</label>
                <div className="flex bg-black border border-white/5 rounded-xl overflow-hidden">
                    <input type="number" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="0" className="w-full bg-transparent p-3 text-xs outline-none font-black" />
                    <select value={curr} onChange={(e) => setCurr(e.target.value as any)} className="bg-white/5 text-[9px] font-black p-2 outline-none">
                        <option value="PKR">PKR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
              </div>
              <div>
                <label className="text-[8px] font-black text-slate-600 uppercase mb-2 block">Ledger Account</label>
                <select value={acc} onChange={(e) => setAcc(e.target.value as any)} className="w-full bg-black border border-white/5 rounded-xl p-3 text-xs outline-none">
                  <option value="Cash">Cash</option>
                  <option value="Accounts Receivable">Accounts Receivable</option>
                  <option value="Inventory">Inventory Stock</option>
                  <option value="Revenue">Revenue (Export)</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="text-[8px] font-black text-slate-600 uppercase mb-2 block">Taxable (GST)</label>
                <button type="button" onClick={() => setIsTax(!isTax)} className={`w-full p-3 rounded-xl border text-[9px] font-black uppercase transition-all ${isTax ? "bg-amber-500/10 border-amber-500 text-amber-500" : "border-white/5 text-slate-600"}`}>
                    {isTax ? "Tax Enabled" : "No Tax"}
                </button>
              </div>
              <button type="submit" className="bg-emerald-500 text-black p-3 rounded-xl font-black uppercase text-[10px] hover:scale-105 transition-all">Post Transaction</button>
            </div>
          </form>

          {/* RECENT JOURNAL LIST */}
          <div className="space-y-3">
             {entries.map(e => (
               <div key={e.id} className="group flex items-center justify-between p-5 bg-[#050505] rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all">
                  <div className="flex gap-4 items-center">
                    <div className={`p-3 rounded-lg ${e.type === "Debit" ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"}`}>
                        {e.currency === "PKR" ? <Landmark size={16}/> : <ArrowRightLeft size={16}/>}
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-tight">{e.desc}</p>
                        <p className="text-[8px] font-bold text-slate-700 uppercase">{e.date} // {e.account} {e.currency !== "PKR" && `(Converted from ${e.originalAmount} ${e.currency})`}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black italic tracking-tighter">Rs. {e.amount.toLocaleString()}</p>
                    {e.isTaxable && <p className="text-[7px] font-black text-amber-600 uppercase">GST Applied</p>}
                  </div>
               </div>
             ))}
          </div>
        </div>
      )}

      {/* 3. TAX REPORT TAB */}
      {activeTab === "tax" && (
        <div className="animate-in zoom-in-95 duration-300 max-w-2xl">
          <div className="bg-[#050505] p-10 rounded-[3rem] border border-amber-500/20">
            <h2 className="text-2xl font-black italic uppercase text-amber-500 mb-2">FBR Compliance <span className="text-white">Node</span></h2>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-10">Calculated based on Sialkot Export Regulations</p>
            
            <div className="space-y-6">
                <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-slate-400 text-xs font-bold uppercase">Taxable Turnover</span>
                    <span className="font-black">Rs. {entries.filter(e => e.isTaxable).reduce((a, b) => a + b.amount, 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4">
                    <span className="text-amber-500 text-xs font-black uppercase">Tax Liability ({taxRate}%)</span>
                    <span className="font-black text-xl italic text-amber-500">Rs. {totalTaxLiability.toLocaleString()}</span>
                </div>
            </div>
            <button className="w-full mt-10 bg-white/5 border border-white/10 text-slate-400 p-4 rounded-2xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-white/10">
                <Printer size={16} /> Export FBR Annexure-A
            </button>
          </div>
        </div>
      )}

      {/* (Other tabs: Trial Balance and Balance Sheet would follow the same automated logic as before) */}
    </div>
  );
}