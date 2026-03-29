"use client";
import { useState, useEffect } from "react";
import { 
  FileText, 
  UploadCloud, 
  Search, 
  Download, 
  Trash2, 
  Lock,
  ArrowUpRight
} from "lucide-react";

export default function DocumentVault() {
  const [config, setConfig] = useState({ primaryColor: "#10b981" });
  
  useEffect(() => {
    const saved = localStorage.getItem("cyberPakConfig");
    if (saved) {
      try { setConfig(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const docs = [
    { name: "GD_902_Sialkot_Dryport.pdf", type: "Goods Declaration", size: "1.2 MB", date: "2026-03-25", status: "Verified" },
    { name: "Bill_of_Lading_MSC_44.pdf", type: "Logistics", size: "850 KB", date: "2026-03-24", status: "Verified" },
    { name: "Form_E_StateBank_99.jpg", type: "SBP Form-E", size: "2.4 MB", date: "2026-03-22", status: "Pending" },
  ];

  return (
    <div className="p-8 md:p-12 min-h-screen bg-black font-mono text-[12px]">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase flex items-center gap-4">
            <Lock className="text-red-600" size={32} /> Document <span style={{ color: config.primaryColor }}>Vault</span>
          </h1>
          <p className="text-slate-500 mt-2 font-bold uppercase tracking-[0.2em] text-[9px]">
            Secure Storage // SBP & FBR Compliance Locker
          </p>
        </div>
        <button className="bg-white text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] flex items-center gap-2 hover:bg-cyan-400 transition-all">
          <UploadCloud size={16} /> Upload New File
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR FILTERS */}
        <div className="space-y-6">
          <div className="bg-[#050505] border border-slate-900 p-6 rounded-3xl">
            <p className="text-[9px] font-black text-slate-600 uppercase mb-4 tracking-widest">Storage Categories</p>
            <div className="space-y-2">
              {["Export Docs", "Bank (Form-E)", "Taxes/FBR", "Client Contracts"].map((cat) => (
                <button key={cat} className="w-full text-left p-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all flex justify-between items-center group">
                  <span className="font-bold">{cat}</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN VAULT AREA */}
        <div className="lg:col-span-3">
          <div className="bg-[#050505] border border-slate-900 rounded-[2.5rem] overflow-hidden">
            <div className="p-6 border-b border-slate-900 bg-black/50">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  placeholder="Search Order #..." 
                  className="w-full bg-black border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-600 uppercase text-[9px] font-black tracking-widest border-b border-slate-900">
                  <th className="p-6">Document Name</th>
                  <th className="p-6">Type</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {docs.map((doc, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-all group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-900 rounded-xl text-slate-400 group-hover:text-cyan-400 transition-colors">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="text-white font-black italic">{doc.name}</p>
                          <p className="text-[8px] text-slate-600 mt-1">{doc.size} // {doc.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 uppercase font-bold text-slate-500">{doc.type}</td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-emerald-500/10 rounded-lg text-slate-600 hover:text-emerald-500"><Download size={16} /></button>
                        <button className="p-2 hover:bg-red-500/10 rounded-lg text-slate-600 hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}