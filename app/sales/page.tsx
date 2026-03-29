"use client";
import { useState } from "react";
import { DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

export default function SalesPage() {
  const [sales, setSales] = useState<{client: string, amount: number, date: string}[]>([]);
  
  return (
    <div className="p-12 bg-black min-h-screen text-emerald-400 font-mono">
      <header className="flex justify-between items-end mb-10 border-b border-emerald-500/10 pb-6">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter">SALES <span className="text-cyan-400">ENGINE</span></h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-2">Revenue Tracking // Sialkot Hub</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-500 uppercase font-black">Total Revenue</p>
          <p className="text-2xl font-black text-white">PKR {sales.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</p>
        </div>
      </header>

      {/* QUICK ENTRY FORM */}
      <div className="bg-slate-900 border border-emerald-500/20 p-6 rounded-xl mb-8">
        <h3 className="text-xs font-black mb-4 flex items-center gap-2"><ShoppingCart size={14}/> NEW INVOICE ENTRY</h3>
        <div className="flex gap-4">
          <input className="flex-1 bg-black border border-slate-800 p-3 rounded text-sm text-white outline-none focus:border-emerald-500" placeholder="Client Name / Order ID" />
          <input className="w-48 bg-black border border-slate-800 p-3 rounded text-sm text-white outline-none focus:border-emerald-500" placeholder="Amount (PKR)" type="number" />
          <button className="bg-cyan-500 text-black px-6 font-black uppercase italic text-xs hover:bg-white transition-all">Record Sale</button>
        </div>
      </div>
    </div>
  );
}