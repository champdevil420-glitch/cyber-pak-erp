"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import React from "react";
import { 
  LayoutDashboard, Factory, FolderLock, Users, 
  Scale, Receipt, Truck, ShieldCheck, Wallet, Activity
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white flex min-h-screen overflow-hidden`}>
        
        {/* --- STABLE SIDEBAR --- */}
        <aside className="hidden md:flex w-64 bg-[#080808] border-r border-zinc-900 flex-col h-screen sticky top-0">
          
          <div className="p-8 flex items-center gap-3 border-b border-zinc-900/50">
            <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
            <h1 className="font-black uppercase italic text-[10px] tracking-tighter">Cyber-Pak ERP</h1>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            
            {/* SECTION 1 */}
            <div>
              <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-3 px-2">Financial Control</p>
              <div className="space-y-1">
                <Link href="/accounts" className="flex items-center gap-3 p-2 text-[10px] font-bold uppercase hover:bg-zinc-900 rounded-lg transition-all">
                  <Receipt size={14} className="text-emerald-500" /> Journal Ledger
                </Link>
                <Link href="/trial-balance" className="flex items-center gap-3 p-2 text-[10px] font-bold uppercase hover:bg-zinc-900 rounded-lg transition-all">
                  <Scale size={14} className="text-blue-500" /> Trial Balance
                </Link>
              </div>
            </div>

            {/* SECTION 2 */}
            <div>
              <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-3 px-2">Production & Vault</p>
              <div className="space-y-1">
                <Link href="/production" className="flex items-center gap-3 p-2 text-[10px] font-bold uppercase hover:bg-zinc-900 rounded-lg transition-all">
                  <Factory size={14} className="text-purple-500" /> Production Line
                </Link>
                <Link href="/vault" className="flex items-center gap-3 p-2 text-[10px] font-bold uppercase hover:bg-zinc-900 rounded-lg transition-all">
                  <FolderLock size={14} className="text-cyan-500" /> Tech Vault
                </Link>
                <Link href="/logistics" className="flex items-center gap-3 p-2 text-[10px] font-bold uppercase hover:bg-zinc-900 rounded-lg transition-all">
                  <Truck size={14} className="text-yellow-500" /> Logistics
                </Link>
              </div>
            </div>

            {/* SECTION 3 */}
            <div>
              <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-3 px-2">Human Resources</p>
              <div className="space-y-1">
                <Link href="/hr" className="flex items-center gap-3 p-2 text-[10px] font-bold uppercase hover:bg-zinc-900 rounded-lg transition-all">
                  <Users size={14} className="text-orange-500" /> Employees
                </Link>
                <Link href="/payroll" className="flex items-center gap-3 p-2 text-[10px] font-bold uppercase hover:bg-zinc-900 rounded-lg transition-all text-emerald-400">
                  <Wallet size={14} /> Payroll System
                </Link>
              </div>
            </div>

          </nav>

          <div className="p-6 border-t border-zinc-900">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[8px] font-bold text-zinc-600 uppercase">System Active</span>
             </div>
          </div>
        </aside>

        {/* --- MAIN AREA --- */}
        <main className="flex-1 h-screen overflow-y-auto bg-black">
          {children}
        </main>

      </body>
    </html>
  );
}