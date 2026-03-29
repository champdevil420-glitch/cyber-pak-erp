"use client";
import { useState, useEffect } from "react";
import { 
  Zap, 
  TrendingUp, 
  Package, 
  Users, 
  ShieldAlert, 
  Clock, 
  ArrowUpRight, 
  Factory 
} from "lucide-react";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");
  const [config, setConfig] = useState({
    siteName: "CYBER-PAK ERP",
    primaryColor: "#10b981",
  });

  // Handle Hydration & Clock
  useEffect(() => {
    setMounted(true);
    
    // Load branding
    const saved = localStorage.getItem("cyberPakConfig");
    if (saved) {
      try { setConfig(JSON.parse(saved)); } catch (e) { console.error(e); }
    }

    // Live Clock Update
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Show a loading skeleton or empty space while waiting for mount to prevent mismatch
  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="p-8 md:p-12 min-h-screen bg-black font-mono text-[12px] text-white">
      
      {/* --- TOP STATUS BAR --- */}
      <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
            Main <span style={{ color: config.primaryColor }}>Terminal</span>
          </h1>
          <p className="text-slate-500 mt-2 font-bold uppercase tracking-[0.3em] text-[9px]">
            System Online // Sialkot Node Active
          </p>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end mb-1">
            <Clock size={14} className="text-slate-600" />
            <span className="text-xl font-black italic tabular-nums">{time}</span>
          </div>
          <p className="text-[8px] text-slate-700 font-bold uppercase tracking-widest">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* --- CORE METRICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Active Orders", val: "42", icon: Package, color: config.primaryColor },
          { label: "Factory Output", val: "94%", icon: Factory, color: "#22d3ee" },
          { label: "Workforce", val: "128", icon: Users, color: "#a855f7" },
          { label: "System Load", val: "2.4ms", icon: Zap, color: "#f59e0b" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#050505] border border-slate-900 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-white/20 transition-all">
            <stat.icon className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-white/10 transition-all" size={100} />
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-2">{stat.label}</p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black italic tracking-tighter uppercase leading-none">{stat.val}</span>
              <TrendingUp size={16} style={{ color: stat.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* --- OPERATIONAL GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RECENT ACTIVITY LOG */}
        <div className="lg:col-span-2 bg-[#050505] border border-slate-900 rounded-[3rem] p-10">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-black uppercase italic tracking-widest text-sm flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live System Pulse
            </h3>
            <button className="text-[8px] font-black uppercase text-slate-600 hover:text-white transition-all">View All Logs</button>
          </div>
          
          <div className="space-y-6">
            {[
              { log: "Operator #4 started Stitching on Order #902", time: "14:22", cat: "PROD" },
              { log: "Shipment EXP-884 cleared Sialkot Dryport", time: "12:05", cat: "LOGS" },
              { log: "New Client Inquiry: Global Sports (Germany)", time: "10:45", cat: "CRM" },
              { log: "Biometric Shift Sync: Morning Batch Check-in", time: "08:00", cat: "HR" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 group cursor-pointer hover:pl-2 transition-all">
                <div className="flex items-center gap-6">
                  <span className="text-[9px] font-black text-slate-700 w-10 uppercase italic">{item.cat}</span>
                  <p className="font-bold text-slate-400 group-hover:text-white transition-all">{item.log}</p>
                </div>
                <span className="text-[10px] text-slate-800 font-black italic">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECURITY STATUS */}
        <div className="bg-red-600/5 border border-red-600/10 rounded-[3rem] p-10 flex flex-col">
          <ShieldAlert className="text-red-600 mb-6" size={40} />
          <h3 className="text-red-500 font-black uppercase text-lg tracking-tighter mb-4 italic">Security Node</h3>
          <p className="text-slate-500 font-bold leading-relaxed mb-8 text-[11px]">
            End-to-end encryption active. No unauthorized access attempts detected in last 24 hours.
          </p>
          <div className="mt-auto pt-6 border-t border-red-950/20">
             <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-red-900 uppercase italic tracking-widest">Protocol 99 Active</span>
                <ArrowUpRight className="text-red-900" size={16} />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}