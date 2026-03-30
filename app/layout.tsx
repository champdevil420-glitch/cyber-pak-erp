"use client";
import "./globals.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, Zap, Fingerprint, Factory, 
  Contact2, ShieldAlert, BookOpen, FolderLock, 
  FileText, Bell, Globe2, LucideIcon,
  Wallet, Scale, Activity, Search
} from "lucide-react";

// Types for the Navigation
interface NavLink {
  name: string;
  href: string;
  icon: LucideIcon;
  alert?: string;
  special?: boolean;
  root?: boolean;
}

interface NavGroup {
  label: string;
  links: NavLink[];
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState({
    siteName: "CYBER-PAK ERP",
    primaryColor: "#10b981", // Emerald
    accentColor: "#22d3ee"   // Cyan
  });

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("cyberPakConfig");
    if (saved) {
      try { setConfig(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const navGroups: NavGroup[] = [
    {
      label: "Intelligence",
      links: [
        { name: "Neural Pulse", href: "/notifications", icon: Bell, alert: "3", special: true },
        { name: "Command Center", href: "/", icon: LayoutDashboard },
      ]
    },
    {
      label: "Operations",
      links: [
        { name: "Production", href: "/production", icon: Factory },
        { name: "Doc Vault", href: "/vault", icon: FolderLock },
        { name: "Invoice Gen", href: "/invoices", icon: FileText },
      ]
    },
    {
      label: "Supply Chain",
      links: [
        { name: "Shipment Track", href: "/logistics", icon: Globe2 },
        { name: "Client CRM", href: "/crm", icon: Contact2 },
      ]
    },
    {
      label: "Administration",
      links: [
        { name: "HR Control", href: "/hr", icon: Fingerprint },
        { name: "Payroll System", href: "/payroll", icon: Wallet },
        { name: "Journal Ledger", href: "/accounts", icon: BookOpen },
        { name: "Trial Balance", href: "/trial-balance", icon: Scale },
        { name: "Super Admin", href: "/admin", icon: ShieldAlert, root: true },
      ]
    }
  ];

  return (
    <html lang="en">
      <body className="bg-black font-mono flex h-screen overflow-hidden text-white">
        
        {/* --- THE PRO SIDEBAR --- */}
        <nav className="w-64 border-r border-white/5 p-6 flex flex-col bg-[#050505] h-full sticky top-0 z-50 shadow-2xl">
          <div className="flex items-center gap-3 mb-10 shrink-0">
            <div className="p-2 bg-white/5 rounded-lg border" style={{ borderColor: `${config.primaryColor}44` }}>
              <Zap style={{ color: config.accentColor }} className="animate-pulse" size={20} />
            </div>
            <div className="flex flex-col font-black italic tracking-tighter text-xl uppercase leading-none">
              {config.siteName}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-6 text-[10px] font-black uppercase tracking-[0.12em] overflow-y-auto no-scrollbar pr-2">
            {navGroups.map((group, gIdx) => (
              <div key={gIdx}>
                <p className="text-[8px] text-zinc-600 mb-2 font-bold border-b border-zinc-900 pb-1 italic uppercase tracking-widest">
                  {group.label}
                </p>
                <div className="flex flex-col gap-1">
                  {group.links.map((link, lIdx) => {
                    const Icon = link.icon;
                    return (
                      <Link 
                        key={lIdx} 
                        href={link.href} 
                        className={`flex items-center justify-between p-2.5 rounded-lg transition-all 
                          ${link.special ? 'bg-red-600/5 text-red-500 border border-red-600/10' : 
                            link.root ? 'bg-white/5 border border-white/10 text-white hover:bg-red-600' : 
                            'hover:bg-white/5 hover:text-white text-zinc-500'}`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={16} style={!link.special && !link.root ? { color: config.primaryColor } : {}} /> 
                          <span>{link.name}</span>
                        </div>
                        {link.alert && mounted && (
                          <span className="bg-red-600 text-white text-[7px] px-1.5 py-0.5 rounded-full animate-pulse">
                            {link.alert}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
            <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">Node: Sialkot-01</span>
          </div>
        </nav>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 bg-[#020202] overflow-y-auto h-screen relative">
            {/* Top Bar for Professional Look */}
            <header className="h-16 border-b border-white/5 sticky top-0 bg-black/50 backdrop-blur-md z-40 flex items-center justify-between px-10">
               <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 px-4 py-1.5 rounded-lg">
                  <Search size={14} className="text-zinc-600" />
                  <input placeholder="ENTER COMMAND..." className="bg-transparent outline-none text-[9px] font-black uppercase w-32 text-zinc-400" />
               </div>
               <div className="flex items-center gap-4">
                  <Activity size={14} className="text-emerald-500" />
                  <div className="text-[8px] font-black text-zinc-600 uppercase">System Integrity: 100%</div>
               </div>
            </header>

            {/* CRT Effect Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]" />
            
            <div className="relative z-10 p-8">
              {mounted ? children : null}
            </div>
        </main>
      </body>
    </html>
  );
}