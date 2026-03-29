"use client";
import { useState } from "react";
import { ShieldCheck, Cpu, Globe, Lock } from "lucide-react";

export default function SettingsPage() {
  const [taxMode, setTaxMode] = useState(true);

  return (
    <div className="p-8 md:p-16 min-h-screen bg-black text-emerald-400 font-mono">
      <h1 className="text-4xl font-black italic mb-2 tracking-tighter">
        SYSTEM <span className="text-cyan-400">CONFIG</span>
      </h1>
      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-12">Core Engine Control // Encryption Level: AES-256</p>

      <div className="max-w-3xl space-y-6">
        {/* TAX TOGGLE CARD */}
        <div className="p-8 bg-slate-900/40 border border-emerald-500/20 rounded-2xl flex justify-between items-center group hover:border-emerald-500/50 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-black rounded-lg border border-slate-800 text-cyan-400">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h3 className="font-bold text-white uppercase text-sm tracking-tight">FBR Fiscal Engine</h3>
              <p className="text-[10px] text-slate-500 italic">Toggle automatic 2025-26 tax deductions</p>
            </div>
          </div>
          <button 
            onClick={() => setTaxMode(!taxMode)}
            className={`w-14 h-7 rounded-full p-1 transition-all duration-300 ${taxMode ? 'bg-emerald-500' : 'bg-slate-700'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-all duration-300 ${taxMode ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* SYSTEM STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 border border-slate-900 rounded-xl bg-slate-900/20 flex items-center gap-4">
            <Cpu className="text-slate-600" size={20} />
            <div>
              <p className="text-[9px] text-slate-500 uppercase font-bold">Server Region</p>
              <p className="text-xs text-white">PK-SOUTH-1 (Karachi)</p>
            </div>
          </div>
          <div className="p-6 border border-slate-900 rounded-xl bg-slate-900/20 flex items-center gap-4">
            <Globe className="text-slate-600" size={20} />
            <div>
              <p className="text-[9px] text-slate-500 uppercase font-bold">Currency Base</p>
              <p className="text-xs text-white">Pakistani Rupee (PKR)</p>
            </div>
          </div>
        </div>

        <button className="w-full mt-8 border border-red-500/30 text-red-500 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2">
          <Lock size={14} /> RE-AUTHENTICATE SYSTEM
        </button>
      </div>
    </div>
  );
}