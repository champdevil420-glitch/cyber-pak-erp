"use client";
import { useState, useEffect } from "react";
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Clock, 
  Zap, 
  ShieldAlert,
  Archive
} from "lucide-react";

export default function NotificationCenter() {
  const [config, setConfig] = useState({ primaryColor: "#10b981" });
  
  useEffect(() => {
    const saved = localStorage.getItem("cyberPakConfig");
    if (saved) setConfig(JSON.parse(saved));
  }, []);

  const alerts = [
    { 
      id: 1, 
      title: "CRITICAL: Raw Material Shortage", 
      desc: "Leather Stock (Batch #B-90) dropped to 8%. Immediate procurement required.", 
      type: "critical", 
      time: "10 mins ago" 
    },
    { 
      id: 2, 
      title: "Shipment Delay Warning", 
      desc: "Order #SK-442 to Hamburg is 2 days behind schedule. Logistics node: Karachi Port.", 
      type: "warning", 
      time: "2 hours ago" 
    },
    { 
      id: 3, 
      title: "FBR Compliance Deadline", 
      desc: "Sales Tax return filing for Q1 2026 is due in 48 hours. Generate reports now.", 
      type: "tax", 
      time: "5 hours ago" 
    },
  ];

  return (
    <div className="p-8 md:p-12 min-h-screen bg-black font-mono text-[12px]">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase flex items-center gap-4">
            <Zap className="animate-pulse" style={{ color: config.primaryColor }} size={32} /> 
            Neural <span style={{ color: config.primaryColor }}>Pulse</span>
          </h1>
          <p className="text-slate-500 mt-2 font-bold uppercase tracking-[0.2em] text-[9px]">
            System Intelligence // Real-Time Alert Protocols
          </p>
        </div>
        <div className="flex gap-4">
            <button className="border border-slate-800 text-slate-500 px-6 py-3 rounded-xl font-black uppercase text-[10px] hover:bg-white hover:text-black transition-all">
                Clear All Logs
            </button>
            <button className="bg-white text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] flex items-center gap-2">
                <Archive size={16} /> Export Logs
            </button>
        </div>
      </div>

      <div className="max-w-4xl space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`p-6 rounded-[2rem] border transition-all flex items-start gap-6 ${
              alert.type === 'critical' ? 'bg-red-600/5 border-red-600/20' : 
              alert.type === 'warning' ? 'bg-amber-500/5 border-amber-500/20' : 
              'bg-cyan-500/5 border-cyan-500/20'
            }`}
          >
            <div className={`p-4 rounded-2xl ${
              alert.type === 'critical' ? 'text-red-500 bg-red-500/10' : 
              alert.type === 'warning' ? 'text-amber-500 bg-amber-500/10' : 
              'text-cyan-500 bg-cyan-500/10'
            }`}>
                {alert.type === 'critical' ? <ShieldAlert size={24} /> : <AlertTriangle size={24} />}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className={`font-black uppercase tracking-tighter text-sm ${
                  alert.type === 'critical' ? 'text-red-500' : 
                  alert.type === 'warning' ? 'text-amber-500' : 
                  'text-cyan-400'
                }`}>
                  {alert.title}
                </h3>
                <span className="text-[8px] text-slate-600 font-black flex items-center gap-1 uppercase italic">
                  <Clock size={10} /> {alert.time}
                </span>
              </div>
              <p className="text-slate-400 font-bold leading-relaxed max-w-2xl text-[11px]">
                {alert.desc}
              </p>
              
              <div className="mt-4 flex gap-3">
                <button className="text-[9px] font-black uppercase py-1.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all">
                    Resolve Issue
                </button>
                <button className="text-[9px] font-black uppercase py-1.5 px-4 rounded-lg text-slate-600 hover:text-slate-400">
                    Ignore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}