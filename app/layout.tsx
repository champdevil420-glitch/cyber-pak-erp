"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import React, { useEffect } from "react";
import { 
  Database, 
  FolderLock, 
  ShieldCheck, 
  LayoutDashboard,
  Activity
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // --- DATA RECOVERY ENGINE ---
  // This looks for your "lost" items and moves them to the new system
  useEffect(() => {
    const oldData = localStorage.getItem("cyberPak_enterprise_acc");
    const newData = localStorage.getItem("cyberPak_entries");

    if (oldData && !newData) {
      console.log("Old data found! Migrating to the new system...");
      localStorage.setItem("cyberPak_entries", oldData);
      // We keep the old data just in case, but now the new pages can see it.
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white flex min-h-screen overflow-hidden`}>
        
        {/* --- DESKTOP SIDEBAR --- */}
        <aside className="hidden md:flex w-72 bg-[#080808] border-r border-zinc-900 flex-col p-8 h-screen sticky top-0">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="font-black italic text-sm tracking-tighter uppercase leading-none">Cyber-Pak</h1>
              <span className="text-[10px] text-blue-500 font-bold tracking-[0.3em] uppercase">Executive Node</span>
            </div>
          </div>

          <nav className="space-y-4 flex-1">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-4 mb-2">Management</p>
            
            <Link href="/accounts" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-900 transition-all group border border-transparent hover:border-zinc-800">
              <Database size={20} className="text-zinc-500 group-hover:text-emerald-500" />
              <span className="text-[11px] font-black uppercase tracking-widest">Financials</span>
            </Link>

            <Link href="/vault" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-900 transition-all group border border-transparent hover:border-zinc-800">
              <FolderLock size={20} className="text-zinc-500 group-hover:text-blue-500" />
              <span className="text-[11px] font-black uppercase tracking-widest">Tech Vault</span>
            </Link>
          </nav>

          <div className="mt-auto pt-8 border-t border-zinc-900">
            <div className="flex items-center gap-3 px-2">
              <Activity size={14} className="text-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">System Online // Sialkot</span>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT WINDOW --- */}
        <main className="flex-1 h-screen overflow-y-auto bg-[#020202] relative">
          {/* Top Header Bar */}
          <header className="h-20 border-b border-zinc-900 flex items-center px-8 md:px-12 justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-30">
             <div className="flex flex-col">
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em]">Enterprise Resource Planning</span>
                <span className="text-xs font-bold text-white uppercase italic">Active Session</span>
             </div>
             <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
             </div>
          </header>

          {/* This is where your actual Accounts and Vault code shows up */}
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>

        {/* --- MOBILE NAVIGATION --- */}
        <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-zinc-900/90 backdrop-blur-2xl border border-white/10 h-20 rounded-[2.5rem] flex items-center justify-around px-10 z-50 shadow-2xl">
          <Link href="/accounts" className="flex flex-col items-center gap-1">
            <Database size={22} className="text-emerald-500" />
            <span className="text-[9px] font-black uppercase">Money</span>
          </Link>
          <div className="w-px h-8 bg-zinc-800"></div>
          <Link href="/vault" className="flex flex-col items-center gap-1">
            <FolderLock size={22} className="text-blue-500" />
            <span className="text-[9px] font-black uppercase">Vault</span>
          </Link>
        </nav>

      </body>
    </html>
  );
}