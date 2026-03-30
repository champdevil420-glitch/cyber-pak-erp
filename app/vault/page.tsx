"use client";
import React, { useState, useEffect } from "react";
import { 
  Ruler, Layout, FileText, ExternalLink, 
  Trash2, FolderOpen, Plus, Search
} from "lucide-react";

interface Asset {
  id: number;
  name: string;
  type: "Size Chart" | "Pattern" | "Design" | "Other";
  url: string;
  date: string;
}

export default function TechnicalVault() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [mounted, setMounted] = useState(false);
  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState<Asset["type"]>("Design");
  const [assetUrl, setAssetUrl] = useState("");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cyberPak_assets");
    if (saved) setAssets(JSON.parse(saved));
  }, []);

  const addAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName || !assetUrl) return;
    const newAsset: Asset = {
      id: Date.now(),
      name: assetName,
      type: assetType,
      url: assetUrl,
      date: new Date().toLocaleDateString('en-GB')
    };
    const updated = [newAsset, ...assets];
    setAssets(updated);
    localStorage.setItem("cyberPak_assets", JSON.stringify(updated));
    setAssetName(""); setAssetUrl("");
  };

  const deleteAsset = (id: number) => {
    const updated = assets.filter(a => a.id !== id);
    setAssets(updated);
    localStorage.setItem("cyberPak_assets", JSON.stringify(updated));
  };

  if (!mounted) return null;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-[#050505] text-white font-mono">
      
      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-end mb-12 gap-6">
        <div>
            <div className="flex items-center gap-3 text-blue-500 mb-2">
                <FolderOpen size={24} />
                <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">Technical Tech-Pack Vault</h1>
            </div>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Secure Storage for Patterns, Size Charts & Blueprints</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl flex items-center gap-3 px-4">
            <Search size={14} className="text-zinc-600" />
            <input placeholder="Search assets..." className="bg-transparent text-[10px] outline-none uppercase font-bold w-40" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Upload Column */}
        <div className="lg:col-span-1">
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] sticky top-10">
                <div className="flex items-center gap-2 mb-8">
                    <Plus size={16} className="text-blue-500" />
                    <h2 className="text-xs font-black uppercase italic text-zinc-400">Register New Asset</h2>
                </div>
                
                <form onSubmit={addAsset} className="space-y-6">
                    <div>
                        <label className="text-[8px] font-black text-zinc-600 uppercase mb-2 block tracking-widest">Document Title</label>
                        <input value={assetName} onChange={(e) => setAssetName(e.target.value)} placeholder="e.g. Surgical Scissor 6' Pattern" className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-xs outline-none focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                        <label className="text-[8px] font-black text-zinc-600 uppercase mb-2 block tracking-widest">Category</label>
                        <select value={assetType} onChange={(e) => setAssetType(e.target.value as any)} className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-xs outline-none">
                            <option value="Size Chart">Size Chart (Specs)</option>
                            <option value="Pattern">Production Pattern</option>
                            <option value="Design">Visual Design/Mockup</option>
                            <option value="Other">Other Docs</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[8px] font-black text-zinc-600 uppercase mb-2 block tracking-widest">Cloud Storage Link</label>
                        <input value={assetUrl} onChange={(e) => setAssetUrl(e.target.value)} placeholder="Google Drive / Dropbox Link" className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-xs outline-none focus:border-blue-500 transition-all" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl font-black uppercase text-[10px] shadow-lg shadow-blue-900/20 transition-all active:scale-95">
                        Save to Tech-Vault
                    </button>
                </form>
            </div>
        </div>

        {/* Display Grid */}
        <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assets.map(asset => (
                    <div key={asset.id} className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-[2rem] group hover:border-blue-500/40 transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                                {asset.type === "Size Chart" ? <Ruler size={24}/> : asset.type === "Pattern" ? <Layout size={24}/> : <FileText size={24}/>}
                            </div>
                            <button onClick={() => deleteAsset(asset.id)} className="text-zinc-800 hover:text-red-500 transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <h4 className="text-sm font-black uppercase mb-1 tracking-tight">{asset.name}</h4>
                        <div className="flex gap-2 items-center mb-6">
                            <span className="text-[8px] px-2 py-1 bg-zinc-800 rounded text-zinc-500 font-black uppercase">{asset.type}</span>
                            <span className="text-[8px] text-zinc-700 font-bold uppercase italic">{asset.date}</span>
                        </div>
                        <a href={asset.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full bg-white text-black p-3 rounded-xl text-[10px] font-black hover:bg-blue-500 hover:text-white transition-all group">
                            <ExternalLink size={14} className="group-hover:rotate-12 transition-transform" /> VIEW TECHNICAL FILE
                        </a>
                    </div>
                ))}
            </div>

            {assets.length === 0 && (
                <div className="border-2 border-dashed border-zinc-900 rounded-[3rem] p-32 text-center">
                    <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.5em]">Vault is Currently Empty</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}