import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Database, 
  FolderLock, 
  Settings, 
  ShieldCheck 
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
      <body className={`${inter.className} bg-black text-white flex min-h-screen overflow-x-hidden`}>
        
        {/* --- DESKTOP SIDEBAR --- */}
        <aside className="hidden md:flex w-64 bg-[#050505] border-r border-zinc-900 flex-col p-6 sticky top-0 h-screen">
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <h1 className="font-black italic text-sm tracking-tighter uppercase">Cyber-Pak <span className="text-blue-500">Node</span></h1>
          </div>

          <nav className="space-y-2 flex-1">
            <Link href="/accounts" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all group">
              <Database size={18} className="text-zinc-500 group-hover:text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Financials</span>
            </Link>
            <Link href="/vault" className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-900 transition-all group">
              <FolderLock size={18} className="text-zinc-500 group-hover:text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Tech Vault</span>
            </Link>
          </nav>

          <div className="mt-auto border-t border-zinc-900 pt-6 px-2">
            <div className="flex items-center gap-3 opacity-50 grayscale">
              <div className="w-6 h-6 rounded-full bg-zinc-800"></div>
              <span className="text-[9px] font-bold uppercase tracking-widest">Sialkot HQ</span>
            </div>
          </div>
        </aside>

        {/* --- MOBILE NAVIGATION (Bottom Bar) --- */}
        <nav className="md:hidden fixed bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-xl border border-white/10 h-16 rounded-2xl flex items-center justify-around px-6 z-50">
          <Link href="/accounts" className="flex flex-col items-center gap-1">
            <Database size={20} className="text-emerald-500" />
            <span className="text-[8px] font-black uppercase">Money</span>
          </Link>
          <Link href="/vault" className="flex flex-col items-center gap-1">
            <FolderLock size={20} className="text-blue-500" />
            <span className="text-[8px] font-black uppercase">Vault</span>
          </Link>
        </nav>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

      </body>
    </html>
  );
}