"use client";
import { useState } from "react";
import { BookOpen, ArrowUpRight, ArrowDownLeft, Scale, Plus, Trash2 } from "lucide-react";

export default function AccountingPage() {
  // 1. STATE: This is where your live data lives
  const [entries, setEntries] = useState([
    { id: 1, desc: "Initial Leather Stock", type: "Expense", amount: 50000, category: "Purchases" },
  ]);

  // 2. INPUT STATE: Holds what you type in the boxes
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("General");

  // 3. ADD FUNCTION: The "Save" button logic
  const addEntry = () => {
    if (!desc || !amount) return alert("Please fill all fields");
    
    const newEntry = {
      id: Date.now(),
      desc,
      type,
      amount: Number(amount),
      category
    };

    setEntries([newEntry, ...entries]); // Adds new entry to the top
    setDesc(""); setAmount(""); // Clears the boxes
  };

  // 4. MATH: Calculates totals automatically
  const totalIncome = entries.filter(e => e.type === "Income").reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = entries.filter(e => e.type === "Expense").reduce((sum, e) => sum + e.amount, 0);
  const trialBalance = totalIncome - totalExpense;

  return (
    <div className="p-8 md:p-16 min-h-screen bg-black text-emerald-400 font-mono">
      <h1 className="text-4xl font-black italic mb-2 tracking-tighter">FISCAL <span className="text-cyan-400">LEDGER</span></h1>
      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-12 italic">Real-Time Journal Entry // Sialkot Hub</p>

      {/* --- ENTRY FORM (DATA ENTRY) --- */}
      <div className="bg-slate-900/40 border border-emerald-500/20 p-8 rounded-2xl mb-12">
        <h3 className="text-xs font-black mb-6 flex items-center gap-2 uppercase tracking-widest text-white">
            <Plus size={14} className="text-cyan-400"/> New Journal Entry
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <input 
            value={desc} onChange={(e) => setDesc(e.target.value)}
            placeholder="Description (e.g. Electricity Bill)" 
            className="bg-black border-b border-slate-700 p-2 text-sm text-white outline-none focus:border-emerald-500 transition-all"
          />
          <input 
            type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (PKR)" 
            className="bg-black border-b border-slate-700 p-2 text-sm text-white outline-none focus:border-emerald-500"
          />
          <select 
            value={type} onChange={(e) => setType(e.target.value)}
            className="bg-black border-b border-slate-700 p-2 text-sm text-emerald-500 outline-none"
          >
            <option value="Expense">DEBIT (Expense)</option>
            <option value="Income">CREDIT (Income)</option>
          </select>
          <button 
            onClick={addEntry}
            className="bg-emerald-500 text-black font-black uppercase text-xs py-3 rounded-lg hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            Record Entry
          </button>
        </div>
      </div>

      {/* --- TRIAL BALANCE SUMMARY --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-slate-900/60 border border-red-500/10 rounded-xl">
          <p className="text-[9px] text-slate-500 uppercase font-black mb-2">Total Debits</p>
          <span className="text-2xl font-black text-red-500">PKR {totalExpense.toLocaleString()}</span>
        </div>
        <div className="p-6 bg-slate-900/60 border border-emerald-500/10 rounded-xl">
          <p className="text-[9px] text-slate-500 uppercase font-black mb-2">Total Credits</p>
          <span className="text-2xl font-black text-emerald-500">PKR {totalIncome.toLocaleString()}</span>
        </div>
        <div className={`p-6 border rounded-xl shadow-lg transition-all ${trialBalance >= 0 ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className="text-[9px] uppercase font-black mb-2">Net Trial Balance</p>
          <span className="text-2xl font-black text-white italic">PKR {trialBalance.toLocaleString()}</span>
        </div>
      </div>

      {/* --- LIVE JOURNAL TABLE --- */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-[#050505]">
        <table className="w-full text-left text-[11px] uppercase tracking-wider">
          <thead className="bg-slate-900/80 text-slate-500 border-b border-slate-800">
            <tr>
              <th className="p-5">Journal Description</th>
              <th className="p-5 text-right">Debit (-)</th>
              <th className="p-5 text-right">Credit (+)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-emerald-500/5 transition-colors">
                <td className="p-5 text-white font-bold">{entry.desc}</td>
                <td className="p-5 text-right text-red-400">
                  {entry.type === "Expense" ? entry.amount.toLocaleString() : "-"}
                </td>
                <td className="p-5 text-right text-emerald-400">
                  {entry.type === "Income" ? entry.amount.toLocaleString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}