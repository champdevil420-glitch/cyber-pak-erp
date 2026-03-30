"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import React, { useEffect } from "react";
import { 
  Database, 
  FolderLock, 
  ShieldCheck, 
  Users, 
  Factory, 
  Truck,
  LayoutDashboard
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  useEffect(() => {
    const oldData = localStorage.getItem("cyberPak_enterprise_acc");
    const newData = localStorage.getItem("cyberPak_entries");
    if (oldData && !newData) {
      localStorage.setItem("cyberPak_entries", oldData);
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white flex min-h-screen overflow-hidden`}>
        
        {/* --- FULL SIDEBAR --- */}
        <aside className="hidden md:flex w-72 bg-[#080808] border-r border-zinc-900 flex-col p-8 h-screen sticky top-0">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="font-black italic text-sm uppercase leading-none">Cyber-Pak</h1>
              <span className="text-[10px] text-blue-500 font-bold tracking-[0.3em] uppercase">Executive Node</span>
            </div>
          </div>

          <nav className="space-y-3 flex-1 overflow-y-auto pr-2">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-4 mb-2">Management</p>
            
            <Link href="/accounts" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-900 transition-all group border border-transparent hover:border-zinc-800">
              <Database size={20} className="text-zinc-500 group-hover:text-emerald-500" />
              <span className="text-[11px] font-black uppercase tracking-widest">Financials</span>
            </Link>

            <Link href="/vault" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-900 transition-all group border border-transparent hover:border-zinc-800">
              <FolderLock size={20} className="text-zinc-500 group-hover:text-blue-500" />
              <span className="text-[11px] font-black uppercase tracking-widest">Tech Vault</span>
            </Link>

            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-4 mt-6 mb-2">Operations</p>

            {/* Added HR Section */}
            <Link href="/hr" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-900 transition-all group border border-transparent hover:border-zinc-800">
              <Users size={20} className="text-zinc-500 group-hover:text-orange-500" />
              <span className="text-[11px] font-black uppercase tracking-widest">HR & Workforce</span>
            </Link>

            {/* Added Production Section */}
            <Link href="/production" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-900 transition-all group border border-transparent hover:border-zinc-800">
              <Factory size={20} className="text-zinc-500 group-hover:text-purple-500" />
              <span className="text-[11px] font-black uppercase tracking-widest">Production</span>
            </Link>

            {/* Added Shipping Section */}
            <Link href="/shipping" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-900 transition-all group border border-transparent hover:border-zinc-800">
              <Truck size={20} className="text-zinc-500 group-hover:text-yellow-500" />
              <span className="text-[11px] font-black uppercase tracking-widest">Shipments</span>
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t border-zinc-900 flex items-center gap-3">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[9px] font-black uppercase text-zinc-600 tracking-widest">Sialkot Active Node</span>
          </div>
        </aside>

        {/* --- MAIN CONTENT WINDOW --- */}
        <main className="flex-1 h-screen overflow-y-auto bg-[#020202] relative">
          <header className="h-20 border-b border-zinc-900 flex items-center px-12 justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-30">
             <h2 className="text-xs font-bold text-white uppercase italic tracking-widest">Active System Pulse</h2>
             <div className="bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-lg text-[10px] font-bold text-zinc-400">
               STATION: 001-SIALKOT
             </div>
          </header>

          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}