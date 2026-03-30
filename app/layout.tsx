import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Database, 
  FolderLock, 
  ShieldCheck,
  UserCircle
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cyber-Pak ERP | Executive Node",
  description: "Advanced Export & Financial Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white flex min-h-screen`}>
        
        {/* --- DESKTOP SIDEBAR --- */}
        <aside className="hidden md:flex w-72 bg-[#080808] border-r border-zinc-900 flex-col p-8 sticky top-0 h-screen z-40">
          <div className="flex items-center gap-3 mb-16 px-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <div>
                <h1 className="font-black italic text-sm tracking-tighter uppercase leading-none">Cyber-Pak</h1>
                <span className="text-[10px] text-blue-500 font-bold tracking-[0.3em] uppercase">Executive</span>
            </div>
          </div>

          <nav className="space-y-4 flex-1">
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-4 mb-2">Systems</p>
            
            <Link href="/accounts" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-900 transition-all group border border-transparent hover:border-zinc-800">
              <Database size={20} className="text-zinc-500 group-hover:text-emerald-500 transition-colors" />
              <span className="text-[11px] font-black uppercase tracking-widest">Financials</span>
            </Link>

            <Link href="/vault" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-900 transition-all group border border-transparent hover:border-zinc-800">
              <FolderLock size={20} className="text-zinc-500 group-hover:text-blue-500 transition-colors" />
              <span className="text-[11px] font-black uppercase tracking-widest">Tech Vault</span>
            </Link>
          </nav>

          <div className="mt-auto pt-8 border-t border-zinc-900">
            <div className="flex items-center gap-4 px-2">
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <UserCircle size={24} className="text-zinc-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-tight">Admin Node</p>
                <p className="text-[8px] text-zinc-600 font-bold uppercase">Sialkot, PK</p>
              </div>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT WINDOW --- */}
        {/* The {children} below is what allows your Accounts and Vault pages to appear! */}
        <main className="flex-1 min-h-screen relative bg-[#020202] overflow-x-hidden pb-24 md:pb-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* --- MOBILE NAVIGATION (Bottom Bar) --- */}
        <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-zinc-900/80 backdrop-blur-2xl border border-white/10 h-20 rounded-[2.5rem] flex items-center justify-around px-10 z-50 shadow-2xl shadow-black">
          <Link href="/accounts" className="flex flex-col items-center gap-2">
            <Database size={22} className="text-emerald-500" />
            <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-400">Accounts</span>
          </Link>
          <div className="w-px h-8 bg-zinc-800"></div>
          <Link href="/vault" className="flex flex-col items-center gap-2">
            <FolderLock size={22} className="text-blue-500" />
            <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-400">Vault</span>
          </Link>
        </nav>

      </body>
    </html>
  );
}