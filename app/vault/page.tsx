"use client";
import React, { useState, useEffect } from "react";
import { Ruler, Layout, FileText, ExternalLink, Trash2, FolderOpen } from "lucide-react";

interface Asset {
  id: number;
  name: string;
  type: "Size Chart" | "Pattern" | "Design" | "Other";
  url: string;
  date: string;
}

export default function VaultPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [mounted, setMounted] = useState(false);
  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState<Asset["type"]>("Design");
  const [assetUrl, setAssetUrl] = useState("");

  useEffect(() => {
    setMounted(true);
    // This key "cyberPak_assets" must be consistent
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
    <div className="p-8 md:p-12 min-h-screen bg-black text-white font-mono">
      <h2 className="text-xl font-black uppercase italic mb-8 border-l-4 border-blue-500 pl-4">Technical Tech-Pack Vault</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
            <form onSubmit={addAsset} className="bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-800 space-y-6">
                <p className="text-[10px] font-black text-blue-500 uppercase mb-4">Register New Pattern/Design</p>
                <input value={assetName} onChange={(e) => setAssetName(e.target.value)} placeholder="Asset Name" className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-xs outline-none focus:border-blue-500" />
                <select value={assetType} onChange={(e) => setAssetType(e.target.value as any)} className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-xs outline-none">
                    <option value="Size Chart">Size Chart</option>
                    <option value="Pattern">Pattern</option>
                    <option value="Design">Design Mockup</option>
                </select>
                <input value={assetUrl} onChange={(e) => setAssetUrl(e.target.value)} placeholder="Storage URL" className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-xs outline-none focus:border-blue-500" />
                <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-xl font-black uppercase text-[10px]">Save to Vault</button>
            </form>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {assets.map(asset => (
                <div key={asset.id} className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-[2rem] group hover:border-blue-500/50 transition-all">
                    <div className="flex justify-between mb-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                            {asset.type === "Size Chart" ? <Ruler size={20}/> : asset.type === "Pattern" ? <Layout size={20}/> : <FileText size={20}/>}
                        </div>
                        <button onClick={() => deleteAsset(asset.id)} className="text-zinc-800 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                    <h4 className="text-xs font-black uppercase mb-1">{asset.name}</h4>
                    <p className="text-[8px] text-zinc-600 font-bold uppercase mb-4">{asset.type}</p>
                    <a href={asset.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-white text-black p-3 rounded-xl text-[10px] font-black hover:bg-blue-600 hover:text-white transition-all">
                        <ExternalLink size={14} /> Open File
                    </a>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}