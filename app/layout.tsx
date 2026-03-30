"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import React, { useEffect } from "react";
import { 
  Activity, LayoutDashboard, Factory, FolderLock, 
  FileText, Globe, Users, BookOpen, ShieldAlert,
  Zap, Bell, Users2, Search, Cpu
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  // --- DATA SAFETY SHIELD ---
  // This automatically migrates any old data to the new system so you don't lose items
  useEffect(() => {
    const keys = ["cyberPak_enterprise_acc", "cyberPak_acc_v1", "cyberPak_entries"];
    let existingData = null;
    
    for (const key of keys) {
      const data = localStorage.getItem(key);
      if (data) {
        existingData = data;
        break;
      }
    }
    
    if (existingData) {
      localStorage.setItem("cyberPak_entries", existingData);
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white flex min-h-screen overflow-hidden`}>
        
        {/* --- PROFESSIONAL SIDEBAR --- */}
        <aside className="hidden md:flex w-72 bg-[#050505] border-r border-zinc-900 flex-col h-screen sticky top-0 overflow-y-auto pb-10">
          
          {/* Brand Header */}
          <div className="p-8 pb-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Cpu size={22} className="text-white" />
            </div>
            <div>
              <h1 className="font-black italic text-lg tracking-tighter uppercase leading-none">Cyber-Pak</h1>
              <span className="text-[9px] text-cyan-500 font-bold tracking-[0.3em] uppercase">Executive v3.0</span>
            </div>
          </div>

          <nav className="px-4 space-y-7 flex-1 mt-6">
            
            {/* CATEGORY: INTELLIGENCE */}
            <div>
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] px-4 mb-3">Intelligence</p>
              <div className="space-y-1">
                <Link href="/" className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/20 group hover:bg-red-500/20 transition-all">
                  <div className="flex items-center gap-4">
                    <Bell size={18} className="text-red-500" />
                    <span className="text-[11px] font-bold uppercase">Neural Pulse</span>
                  </div>
                  <span className="bg-red-500 text-white text-[8px] px-2 py-0.5 rounded-full font-black animate-pulse">LIVE</span>
                </Link>
                <Link href="/" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white group">
                  <LayoutDashboard size={18} className="group-hover:text-cyan-400" />
                  <span className="text-[11px] font-bold uppercase">Command Center</span>
                </Link>
              </div>
            </div>

            {/* CATEGORY: OPERATIONS */}
            <div>
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] px-4 mb-3">Operations</p>
              <div className="space-y-1">
                <Link href="/production" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white group">
                  <Factory size={18} className="group-hover:text-purple-400" />
                  <span className="text-[11px] font-bold uppercase">Production</span>
                </Link>
                <Link href="/vault" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white group">
                  <FolderLock size={18} className="group-hover:text-blue-400" />
                  <span className="text-[11px] font-bold uppercase">Doc Vault</span>
                </Link>
                <Link href="/invoices" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white group">
                  <FileText size={18} className="group-hover:text-emerald-400" />
                  <span className="text-[11px] font-bold uppercase">Invoice Gen</span>
                </Link>
              </div>
            </div>

            {/* CATEGORY: SUPPLY CHAIN */}
            <div>
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] px-4 mb-3">Supply Chain</p>
              <div className="space-y-1">
                <Link href="/logistics" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white group">
                  <Globe size={18} className="group-hover:text-cyan-400" />
                  <span className="text-[11px] font-bold uppercase">Logistics & Track</span>
                </Link>
                <Link href="/crm" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white group">
                  <Users2 size={18} className="group-hover:text-yellow-400" />
                  <span className="text-[11px] font-bold uppercase">Client CRM</span>
                </Link>
              </div>
            </div>

            {/* CATEGORY: ADMINISTRATION */}
            <div>
              <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] px-4 mb-3">Administration</p>
              <div className="space-y-1">
                <Link href="/hr" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white group">
                  <Users size={18} className="group-hover:text-orange-400" />
                  <span className="text-[11px] font-bold uppercase">HR Control</span>
                </Link>
                <Link href="/accounts" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white group">
                  <BookOpen size={18} className="group-hover:text-emerald-400" />
                  <span className="text-[11px] font-bold uppercase">Journal Ledger</span>
                </Link>
              </div>
            </div>

          </nav>

          {/* System Footer */}
          <div className="mt-auto p-6 border-t border-zinc-900">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Sialkot HQ Online</span>
             </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT WINDOW --- */}
        <main className="flex-1 h-screen overflow-y-auto bg-[#020202] relative custom-scrollbar">
          {/* Top Global Bar */}
          <header className="h-20 border-b border-zinc-900/50 flex items-center px-10 justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-50">
             <div className="flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-xl">
                <Search size={14} className="text-zinc-600" />
                <input placeholder="SEARCH ERP DATA..." className="bg-transparent outline-none text-[10px] font-black uppercase w-48 text-zinc-400" />
             </div>
             <div className="flex items-center gap-6">
                <div className="flex flex-col text-right">
                  <span className="text-[8px] text-zinc-600 font-black uppercase">System Status</span>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase italic tracking-tighter">Authorized Access Only</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Activity size={18} className="text-zinc-500" />
                </div>
             </div>
          </header>

          {/* This renders your sub-pages (Accounts, Vault, etc.) */}
          <div className="max-w-7xl mx-auto w-full px-4 md:px-0">
            {children}
          </div>
        </main>

        {/* --- MOBILE NAV (Visible only on phones) --- */}
        <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-zinc-900/90 backdrop-blur-2xl border border-white/10 h-20 rounded-[2.5rem] flex items-center justify-around px-8 z-50 shadow-2xl">
          <Link href="/accounts" className="text-emerald-500 flex flex-col items-center gap-1"><BookOpen size={22}/><span className="text-[8px] font-black">LEDGER</span></Link>
          <Link href="/logistics" className="text-cyan-500 flex flex-col items-center gap-1"><Globe size={22}/><span className="text-[8px] font-black">TRACK</span></Link>
          <Link href="/vault" className="text-blue-500 flex flex-col items-center gap-1"><FolderLock size={22}/><span className="text-[8px] font-black">VAULT</span></Link>
        </nav>

      </body>
    </html>
  );
}