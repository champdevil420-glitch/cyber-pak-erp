"use client";
import { useState, useEffect } from "react";
import { 
  FileText, 
  Printer, 
  Download, 
  Share2, 
  QrCode, 
  Globe, 
  Banknote,
  Plus,
  Trash2
} from "lucide-react";

export default function InvoiceGenerator() {
  const [config, setConfig] = useState({ siteName: "CYBER-PAK", primaryColor: "#10b981" });
  const [items, setItems] = useState([
    { desc: "Leather Boxing Gloves (Pro Series)", qty: 200, price: 25.00 },
    { desc: "Surgical Grade Forceps (Stainless)", qty: 500, price: 8.50 },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("cyberPakConfig");
    if (saved) setConfig(JSON.parse(saved));
  }, []);

  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);

  return (
    <div className="p-8 md:p-12 min-h-screen bg-black font-mono text-[12px]">
      
      {/* TOOLBAR */}
      <div className="flex justify-between items-center mb-10 bg-[#050505] border border-slate-900 p-4 rounded-2xl">
        <div className="flex gap-4">
          <button className="bg-white text-black px-6 py-2 rounded-lg font-black uppercase text-[10px] flex items-center gap-2 hover:bg-cyan-400 transition-all">
            <Printer size={14} /> Print Invoice
          </button>
          <button className="border border-slate-800 text-slate-400 px-6 py-2 rounded-lg font-black uppercase text-[10px] flex items-center gap-2 hover:bg-slate-900 transition-all">
            <Download size={14} /> Export PDF
          </button>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-[8px] text-slate-600 uppercase font-black">Autosave Active</span>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT: INPUT FORM */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#050505] border border-slate-900 p-8 rounded-[2rem]">
            <h3 className="text-white font-black uppercase mb-6 flex items-center gap-2">
                <Plus size={16} className="text-emerald-500" /> Order Details
            </h3>
            <div className="space-y-4">
                <div>
                    <label className="text-[8px] text-slate-600 uppercase mb-1 block">Consignee (Client)</label>
                    <input defaultValue="GLOBAL SPORTS GMBH, GERMANY" className="w-full bg-black border border-slate-800 p-3 rounded-lg text-white outline-none focus:border-emerald-500" />
                </div>
                <div>
                    <label className="text-[8px] text-slate-600 uppercase mb-1 block">Port of Discharge</label>
                    <input defaultValue="HAMBURG, GERMANY" className="w-full bg-black border border-slate-800 p-3 rounded-lg text-white outline-none focus:border-emerald-500" />
                </div>
                <div>
                    <label className="text-[8px] text-slate-600 uppercase mb-1 block">Bank IBAN (Meezan/HBL)</label>
                    <input defaultValue="PK72MEZN00123456789" className="w-full bg-black border border-slate-800 p-3 rounded-lg text-emerald-500 outline-none focus:border-emerald-500" />
                </div>
            </div>
          </div>
        </div>

        {/* RIGHT: LIVE PREVIEW (The "Aha" Document) */}
        <div className="lg:col-span-2">
          <div className="bg-white text-black p-12 shadow-2xl rounded-sm min-h-[842px] relative overflow-hidden">
            
            {/* WATERMARK */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] rotate-[-45deg] pointer-events-none">
                <h1 className="text-[120px] font-black uppercase">{config.siteName}</h1>
            </div>

            {/* INVOICE HEADER */}
            <div className="flex justify-between items-start mb-16 relative z-10">
              <div>
                <h2 className="text-3xl font-black tracking-tighter uppercase leading-none mb-1">Commercial <br/> Invoice</h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Document No: EXP/2026/902</p>
              </div>
              <div className="text-right">
                <h3 className="font-black text-xl uppercase italic">{config.siteName}</h3>
                <p className="text-[9px] leading-tight">Sector 7, Industrial Estate<br/>Sialkot, Pakistan 51310</p>
                <p className="text-[9px] font-bold mt-2">NTN: 1234567-8</p>
              </div>
            </div>

            {/* BILLING INFO */}
            <div className="grid grid-cols-2 gap-10 mb-12 relative z-10 border-y border-black py-6">
                <div>
                    <p className="text-[8px] font-black uppercase mb-2 text-slate-400">Bill To:</p>
                    <p className="font-black text-[11px]">GLOBAL SPORTS GMBH</p>
                    <p className="text-[10px]">Hansastrasse 12, 20144</p>
                    <p className="text-[10px]">Hamburg, Germany</p>
                </div>
                <div className="text-right">
                    <p className="text-[8px] font-black uppercase mb-2 text-slate-400">Shipment Via:</p>
                    <p className="text-[10px] font-bold uppercase italic">Sea Freight // MSC Logistics</p>
                    <p className="text-[10px] mt-1 italic">ETA: April 25, 2026</p>
                </div>
            </div>

            {/* ITEMS TABLE */}
            <table className="w-full mb-12 relative z-10">
                <thead>
                    <tr className="border-b-2 border-black text-[9px] font-black uppercase italic">
                        <th className="text-left pb-2">Description of Goods</th>
                        <th className="text-center pb-2">Qty</th>
                        <th className="text-right pb-2">Unit Price</th>
                        <th className="text-right pb-2">Total (USD)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {items.map((item, i) => (
                        <tr key={i} className="text-[10px]">
                            <td className="py-4 font-bold">{item.desc}</td>
                            <td className="py-4 text-center">{item.qty}</td>
                            <td className="py-4 text-right">${item.price.toFixed(2)}</td>
                            <td className="py-4 text-right font-black">${(item.qty * item.price).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* FOOTER & TOTALS */}
            <div className="flex justify-between items-end relative z-10 mt-auto">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <QrCode size={60} strokeWidth={1.5} />
                        <div className="text-[8px] text-slate-500 uppercase leading-tight font-bold">
                            Scan to verify<br/>Export Compliance<br/>& Customs Data
                        </div>
                    </div>
                    <div>
                        <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Banking Details</p>
                        <p className="text-[9px] font-bold uppercase italic">Meezan Bank Limited, Sialkot</p>
                        <p className="text-[9px] font-bold uppercase">IBAN: PK72MEZN00123456789</p>
                    </div>
                </div>
                <div className="text-right w-64 bg-black text-white p-6 rounded-sm">
                    <p className="text-[9px] font-black uppercase opacity-50 mb-1">Grand Total</p>
                    <p className="text-3xl font-black italic tracking-tighter leading-none">$ {subtotal.toLocaleString()}.00</p>
                    <p className="text-[8px] mt-2 opacity-50 uppercase font-bold">Currency: US Dollars</p>
                </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}