"use client";
import { useState, useEffect } from "react";
import { 
  Users, 
  Fingerprint, 
  Clock, 
  Search, 
  UserPlus, 
  CheckCircle2, 
  XCircle,
  TrendingUp
} from "lucide-react";

export default function HRManagement() {
  const [config, setConfig] = useState({ primaryColor: "#10b981" });
  
  useEffect(() => {
    const saved = localStorage.getItem("cyberPakConfig");
    if (saved) setConfig(JSON.parse(saved));
  }, []);

  const staff = [
    { id: "W-902", name: "Imran Ahmed", role: "Stitching Expert", shift: "Morning", status: "Active", time: "08:00 AM" },
    { id: "W-441", name: "Zubair Khan", role: "Quality Inspector", shift: "Morning", status: "Active", time: "07:55 AM" },
    { id: "W-112", name: "Sajid Ali", role: "Pattern Cutter", shift: "Morning", status: "Late", time: "09:15 AM" },
    { id: "W-550", name: "Bilal Malik", role: "Packing Lead", shift: "Night", status: "Off-Duty", time: "--:--" },
  ];

  return (
    <div className="p-8 md:p-12 min-h-screen bg-black font-mono text-[12px]">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase flex items-center gap-4">
            <Fingerprint style={{ color: config.primaryColor }} size={32} /> 
            HR <span style={{ color: config.primaryColor }}>Control</span>
          </h1>
          <p className="text-slate-500 mt-2 font-bold uppercase tracking-[0.2em] text-[9px]">
            Biometric Node // Shift & Payroll Attendance
          </p>
        </div>
        <button className="bg-white text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] flex items-center gap-2 hover:bg-cyan-400 transition-all">
          <UserPlus size={16} /> Register New Worker
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="bg-[#050505] border border-slate-900 p-6 rounded-[2rem] flex justify-between items-center">
            <div>
                <p className="text-[8px] text-slate-600 font-black uppercase mb-1 tracking-widest">Total Workforce</p>
                <p className="text-2xl font-black text-white italic">142</p>
            </div>
            <Users className="text-slate-800" size={30} />
        </div>
        <div className="bg-[#050505] border border-slate-900 p-6 rounded-[2rem] flex justify-between items-center">
            <div>
                <p className="text-[8px] text-slate-600 font-black uppercase mb-1 tracking-widest">Present Today</p>
                <p className="text-2xl font-black text-emerald-500 italic">128</p>
            </div>
            <CheckCircle2 className="text-emerald-900/30" size={30} />
        </div>
        <div className="bg-[#050505] border border-slate-900 p-6 rounded-[2rem] flex justify-between items-center">
            <div>
                <p className="text-[8px] text-slate-600 font-black uppercase mb-1 tracking-widest">Late Arrivals</p>
                <p className="text-2xl font-black text-amber-500 italic">14</p>
            </div>
            <Clock className="text-amber-900/30" size={30} />
        </div>
      </div>

      <div className="bg-[#050505] border border-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-900 flex justify-between items-center">
           <div className="relative w-full max-w-md">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
             <input placeholder="Search by Worker ID or Name..." className="w-full bg-black border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-emerald-500 transition-all" />
           </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-600 uppercase text-[9px] font-black tracking-widest border-b border-slate-900">
              <th className="p-6">Worker Identity</th>
              <th className="p-6">Role/Department</th>
              <th className="p-6">Shift Status</th>
              <th className="p-6 text-right">Punch-In Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900">
            {staff.map((worker, i) => (
              <tr key={i} className="hover:bg-white/5 transition-all group">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center font-black text-slate-600 text-[10px] border border-slate-800 uppercase">
                        {worker.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-black italic uppercase tracking-tighter text-sm">{worker.name}</p>
                      <p className="text-[8px] text-slate-600 mt-1 font-bold">ID: {worker.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6 font-bold text-slate-400 uppercase italic">{worker.role}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase flex items-center w-fit gap-1 ${
                    worker.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 
                    worker.status === 'Late' ? 'bg-amber-500/10 text-amber-500' : 
                    'bg-slate-900 text-slate-600'
                  }`}>
                    <div className={`w-1 h-1 rounded-full ${worker.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-current'}`} />
                    {worker.status}
                  </span>
                </td>
                <td className="p-6 text-right text-slate-300 font-black italic">{worker.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}