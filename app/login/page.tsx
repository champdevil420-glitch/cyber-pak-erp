"use client";
import { useState, useEffect } from "react";
import { Lock, ShieldCheck, Fingerprint, ChevronRight, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [step, setStep] = useState(1); 
  const [adminId, setAdminId] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // THE MASTER CREDENTIAL
    if (adminId.toLowerCase() === "admin") {
      setStep(2);
      setTimeout(() => setStep(3), 2500);
      setTimeout(() => {
        window.location.href = "/";
      }, 4000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-30" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
            <div className="inline-block p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <ShieldCheck className="text-cyan-400 animate-pulse" size={40} />
            </div>
            <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">
                CYBER-<span className="text-emerald-500">PAK</span>
            </h1>
            <p className="text-[9px] text-slate-500 uppercase tracking-[0.4em] font-bold mt-2">Access Gateway // Sialkot Hub</p>
        </div>

        <div className="bg-[#050505] border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl border-t-emerald-500/20">
            
            {step === 1 && (
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="text-[10px] text-slate-600 font-black uppercase tracking-widest block mb-3">Master Identity</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-emerald-500 transition-colors" size={16} />
                            <input 
                                autoFocus
                                type="text"
                                placeholder="TYPE 'ADMIN' TO ENTER"
                                value={adminId}
                                onChange={(e) => setAdminId(e.target.value)}
                                className={`w-full bg-black border ${error ? 'border-red-500' : 'border-slate-800'} p-4 pl-12 rounded-xl text-white outline-none focus:border-emerald-500 transition-all font-black placeholder:text-slate-900 placeholder:text-[10px]`}
                            />
                        </div>
                        {error && (
                            <p className="text-[9px] text-red-500 mt-3 font-black uppercase flex items-center gap-2 animate-shake">
                                <AlertCircle size={12} /> Access Denied: Identity Not Recognized
                            </p>
                        )}
                    </div>

                    <button className="w-full bg-white text-black font-black py-4 rounded-xl text-[11px] uppercase flex items-center justify-center gap-3 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all active:scale-95 group">
                        Handshake Protocol <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
            )}

            {step === 2 && (
                <div className="text-center py-6">
                    <div className="relative inline-block mb-8">
                        <Fingerprint size={100} className="text-emerald-500/20" />
                        <Fingerprint size={100} className="text-emerald-500 absolute top-0 left-0 animate-pulse" />
                        <div className="absolute left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_cyan] animate-scan-line z-20" />
                    </div>
                    <p className="text-white font-black italic tracking-tighter uppercase text-xl mb-2">Analyzing Scan</p>
                    <div className="flex items-center justify-center gap-2 text-slate-600 font-black text-[10px] uppercase">
                        <Loader2 size={12} className="animate-spin text-cyan-400" />
                        Matching Security Patterns...
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="text-center py-6">
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                        <ShieldCheck size={48} className="text-black" />
                    </div>
                    <p className="text-white font-black italic tracking-tighter uppercase text-2xl mb-2">Authenticated</p>
                    <p className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em]">Redirecting to Command Center</p>
                </div>
            )}
        </div>

        <div className="mt-8 flex justify-between px-6 opacity-20">
            <div className="text-[7px] font-black text-slate-500 uppercase tracking-widest italic">Node: PK-SKT-07</div>
            <div className="text-[7px] font-black text-slate-500 uppercase tracking-widest italic">Layer: RSA-4096</div>
        </div>
      </div>
    </div>
  );
}