"use client";
import { useState, useEffect } from "react";
import { ShieldAlert, Palette, Zap, Percent, Save, CheckCircle2, Loader2 } from "lucide-react";

export default function SuperAdminPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [config, setConfig] = useState({
    siteName: "CYBER-PAK ERP",
    primaryColor: "#10b981", 
    accentColor: "#22d3ee",  
    taxRate: "18.0",
  });

  // Load saved settings on startup
  useEffect(() => {
    const saved = localStorage.getItem("cyberPakConfig");
    if (saved) setConfig(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    // Save to browser memory
    localStorage.setItem("cyberPakConfig", JSON.stringify(config));
    
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      // Refresh to apply changes globally
      window.location.reload(); 
    }, 1000);
  };

  return (
    <div className="p-8 md:p-16 min-h-screen bg-black text-emerald-400 font-mono text-[12px]">
      <div className="flex justify-between items-center mb-12 bg-red-600/5 border border-red-600/20 p-8 rounded-[2rem]">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
            Master <span className="text-red-600">Override</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {showSuccess && <span className="text-emerald-500 font-black uppercase text-[10px]">Saved to System</span>}
          <button 
            onClick={handleSave}
            className="bg-white text-black px-8 py-4 rounded-xl font-black uppercase flex items-center gap-3 hover:bg-cyan-400 transition-all"
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Changes
          </button>
        </div>
      </div>

      <div className="max-w-xl space-y-8 bg-[#050505] p-10 rounded-3xl border border-slate-900">
        <div>
          <label className="text-slate-600 font-black uppercase mb-2 block text-[9px]">Global Brand Name</label>
          <input 
            value={config.siteName} 
            onChange={(e) => setConfig({...config, siteName: e.target.value})}
            className="w-full bg-black border border-slate-800 p-4 rounded-lg text-white outline-none focus:border-emerald-500" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-slate-600 font-black uppercase mb-2 block text-[9px]">Primary Theme Color</label>
            <input 
              type="color" 
              value={config.primaryColor}
              onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
              className="w-full h-14 bg-black border border-slate-800 p-1 rounded-lg cursor-pointer" 
            />
          </div>
          <div>
            <label className="text-slate-600 font-black uppercase mb-2 block text-[9px]">Accent Glow</label>
            <input 
              type="color" 
              value={config.accentColor}
              onChange={(e) => setConfig({...config, accentColor: e.target.value})}
              className="w-full h-14 bg-black border border-slate-800 p-1 rounded-lg cursor-pointer" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}