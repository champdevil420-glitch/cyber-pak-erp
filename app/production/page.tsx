"use client";
import { useState, ReactNode } from "react";
import { Activity, Plus, Trash2, CheckCircle2, Scissors, Box, Truck } from "lucide-react";

// This 'interface' tells TypeScript exactly what a Stage looks like
interface Stage {
  id: number;
  name: string;
  icon: ReactNode;
}

export default function ProductionPage() {
  const [batches, setBatches] = useState([
    { id: "BT-901", item: "Premium Footballs", currentStage: 1, time: "24h" },
  ]);

  const STAGES: Stage[] = [
    { id: 0, name: "Cutting", icon: <Scissors size={14} /> },
    { id: 1, name: "Stitching", icon: <Activity size={14} /> },
    { id: 2, name: "Finishing", icon: <Box size={14} /> },
    { id: 3, name: "Ready", icon: <Truck size={14} /> }
  ];

  const [newItem, setNewItem] = useState("");
  const [newTime, setNewTime] = useState("");

  const addBatch = () => {
    if (!newItem || !newTime) return;
    setBatches([{ 
      id: `BT-${Math.floor(Math.random() * 900) + 100}`, 
      item: newItem, 
      currentStage: 0, 
      time: newTime 
    }, ...batches]);
    setNewItem(""); 
    setNewTime("");
  };

  const moveNext = (id: string) => {
    setBatches(batches.map(b => b.id === id ? { ...b, currentStage: Math.min(3, b.currentStage + 1) } : b));
  };

  const movePrev = (id: string) => {
    setBatches(batches.map(b => b.id === id ? { ...b, currentStage: Math.max(0, b.currentStage - 1) } : b));
  };

  return (
    <div className="p-8 md:p-16 min-h-screen bg-black text-emerald-400 font-mono">
      <h1 className="text-4xl font-black italic mb-2 tracking-tighter uppercase text-white">Production <span className="text-cyan-400">Pipeline</span></h1>
      <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-10 italic">Floor Management // Sialkot Export Hub</p>

      <div className="bg-slate-900/20 border border-emerald-500/10 p-6 rounded-2xl mb-12 flex flex-wrap gap-4 items-end">
        <input value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="Product Name" className="flex-1 bg-black border-b border-emerald-500/30 p-2 outline-none text-white text-sm" />
        <input value={newTime} onChange={e => setNewTime(e.target.value)} placeholder="Lead Time (e.g. 48h)" className="w-32 bg-black border-b border-emerald-500/30 p-2 outline-none text-white text-sm" />
        <button onClick={addBatch} className="bg-emerald-500 text-black px-6 py-2 rounded font-black text-[10px] hover:bg-white transition-all uppercase">Start Production</button>
      </div>

      <div className="space-y-8">
        {batches.map((batch) => (
          <div key={batch.id} className="bg-[#050505] border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">{batch.item}</h3>
                <p className="text-[10px] text-slate-500 font-bold">ID: {batch.id} • <span className="text-cyan-400">TIME: {batch.time}</span></p>
              </div>
              <button onClick={() => setBatches(batches.filter(b => b.id !== batch.id))} className="text-slate-800 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>

            <div className="flex justify-between items-center relative">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-900 -translate-y-1/2 z-0" />
              <div 
                className="absolute top-1/2 left-0 h-[2px] bg-cyan-500 -translate-y-1/2 z-0 transition-all duration-500" 
                style={{ width: `${(batch.currentStage / 3) * 100}%` }}
              />

              {STAGES.map((stage) => (
                <div key={stage.id} className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    batch.currentStage >= stage.id ? 'bg-black border-cyan-400 text-cyan-400' : 'bg-black border-slate-800 text-slate-800'
                  }`}>
                    {batch.currentStage > stage.id ? <CheckCircle2 size={16} className="text-emerald-500" /> : stage.icon}
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-tighter ${batch.currentStage === stage.id ? 'text-white' : 'text-slate-700'}`}>
                    {stage.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center gap-4">
              <button onClick={() => movePrev(batch.id)} className="px-6 py-2 border border-slate-800 rounded-lg text-[9px] font-black uppercase hover:bg-slate-900 transition-all">Back</button>
              <button onClick={() => moveNext(batch.id)} className="px-6 py-2 bg-white text-black rounded-lg text-[9px] font-black uppercase hover:bg-cyan-400 transition-all">Next Stage</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}