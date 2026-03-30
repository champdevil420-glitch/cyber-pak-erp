"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import React from "react";
import { 
  Activity, LayoutDashboard, Factory, FolderLock, 
  FileText, Globe, Users, BookOpen, ShieldAlert,
  Zap, Bell, Users2
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white flex min-h-screen overflow-hidden`}>
        
        {/* --- ADVANCED SIDEBAR --- */}
        <aside className="hidden md:flex w-72 bg-[#050505] border-r border-zinc-900 flex-col p-6 h-screen sticky top-0 overflow-y-auto custom-scrollbar">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-zinc-900 border border-cyan-500/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <Zap size={20} className="text-cyan-400" />
            </div>
            <h1 className="font-black italic text-lg tracking-tighter uppercase">Cyber-Pak <span className="text-zinc-500 text-xs block not-italic tracking-[0.2em]">ERP System</span></h1>
          </div>

          <nav className="space-y-8 flex-1">
            
            {/* INTELLIGENCE */}
            <div>
              <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em] px-4 mb-4">Intelligence</p>
              <div className="space-y-1">
                <Link href="/" className="flex items-center justify-between p-3 rounded-xl bg-red-500/5 border border-red-500/20 group hover:bg-red-500/10 transition-all">
                  <div className="flex items-center gap-4">
                    <Bell size={18} className="text-red-500" />
                    <span className="text-[11px] font-bold uppercase text-red-100">Neural Pulse</span>
                  </div>
                  <span className="bg-red-500 text-white text-[8px] px-2 py-0.5 rounded-full font-black">3</span>
                </Link>
                <Link href="/" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white group">
                  <LayoutDashboard size={18} className="group-hover:text-emerald-400" />
                  <span className="text-[11px] font-bold uppercase">Command Center</span>
                </Link>
              </div>
            </div>

            {/* OPERATIONS */}
            <div>
              <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em] px-4 mb-4">Operations</p>
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

            {/* SUPPLY CHAIN */}
            <div>
              <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em] px-4 mb-4">Supply Chain</p>
              <div className="space-y-1">
                <Link href="/shipping" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white group">
                  <Globe size={18} className="group-hover:text-cyan-400" />
                  <span className="text-[11px] font-bold uppercase">Shipment Track</span>
                </Link>
                <Link href="/crm" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white group">
                  <Users2 size={18} className="group-hover:text-yellow-400" />
                  <span className="text-[11px] font-bold uppercase">Client CRM</span>
                </Link>
              </div>
            </div>

            {/* ADMINISTRATION */}
            <div>
              <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em] px-4 mb-4">Administration</p>
              <div className="space-y-1">
                <Link href="/hr" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white group">
                  <Users size={18} className="group-hover:text-orange-400" />
                  <span className="text-[11px] font-bold uppercase">HR Control</span>
                </Link>
                <Link href="/accounts" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white group">
                  <BookOpen size={18} className="group-hover:text-emerald-400" />
                  <span className="text-[11px] font-bold uppercase">Journal Ledger</span>
                </Link>
                <Link href="/admin" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white group border border-zinc-800/50">
                  <ShieldAlert size={18} className="group-hover:text-red-500" />
                  <span className="text-[11px] font-bold uppercase font-black">Super Admin</span>
                </Link>
              </div>
            </div>
          </nav>
        </aside>

        {/* --- MAIN WINDOW --- */}
        <main className="flex-1 h-screen overflow-y-auto bg-[#020202]">
          {children}
        </main>

      </body>
    </html>
  );
}