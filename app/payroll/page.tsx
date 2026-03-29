"use client";
import { useState } from "react";
import { calculateIncomeTax } from "@/lib/math-engine";
import { Users, Plus, Trash2, Receipt } from "lucide-react";

export default function PayrollPage() {
  const [employees, setEmployees] = useState<{name: string, salary: number}[]>([]);
  const [newName, setNewName] = useState("");
  const [newSalary, setNewSalary] = useState(0);

  const addEmployee = () => {
    if(newName && newSalary > 0) {
      setEmployees([...employees, { name: newName, salary: newSalary }]);
      setNewName(""); setNewSalary(0);
    }
  };

  return (
    <div className="p-12 bg-black min-h-screen text-emerald-400 font-mono">
      <h1 className="text-3xl font-black italic mb-8 uppercase tracking-tighter">Staff & <span className="text-cyan-400">Payroll Ledger</span></h1>
      
      {/* DATA ENTRY FORM */}
      <div className="bg-slate-900/50 p-6 rounded-2xl border border-emerald-500/20 mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="text-[10px] uppercase font-bold text-slate-500">Employee Name</label>
          <input value={newName} onChange={e => setNewName(e.target.value)} className="w-full bg-black border-b border-emerald-500 p-2 outline-none text-white" placeholder="e.g. Ali Mujahid" />
        </div>
        <div>
          <label className="text-[10px] uppercase font-bold text-slate-500">Monthly Salary (PKR)</label>
          <input type="number" value={newSalary} onChange={e => setNewSalary(Number(e.target.value))} className="w-full bg-black border-b border-emerald-500 p-2 outline-none text-white" />
        </div>
        <button onClick={addEmployee} className="bg-emerald-500 text-black font-black py-2 rounded uppercase flex items-center justify-center gap-2 hover:bg-cyan-400">
          <Plus size={16} /> Add to Ledger
        </button>
      </div>

      {/* THE DATA TABLE */}
      <div className="border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs uppercase tracking-wider">
          <thead className="bg-slate-900 text-slate-400">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Gross Salary</th>
              <th className="p-4 text-red-400">FBR Tax</th>
              <th className="p-4 text-cyan-400">Net Pay</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {employees.map((emp, i) => (
              <tr key={i} className="hover:bg-emerald-500/5 transition-colors">
                <td className="p-4 text-white font-bold">{emp.name}</td>
                <td className="p-4">Rs. {emp.salary.toLocaleString()}</td>
                <td className="p-4 text-red-500 font-bold">Rs. {calculateIncomeTax(emp.salary).toLocaleString()}</td>
                <td className="p-4 text-cyan-400 font-bold">Rs. {(emp.salary - calculateIncomeTax(emp.salary) - 400).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}