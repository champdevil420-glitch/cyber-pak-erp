"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// The "Instruction Manual" for our settings
interface ThemeContextType {
  siteName: string;
  primaryColor: string;
  accentColor: string;
  taxRate: string;
  setSiteName: (val: string) => void;
  setPrimaryColor: (val: string) => void;
  setAccentColor: (val: string) => void;
  setTaxRate: (val: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [siteName, setSiteName] = useState("CYBER-PAK");
  const [primaryColor, setPrimaryColor] = useState("#10b981"); // Emerald
  const [accentColor, setAccentColor] = useState("#22d3ee");  // Cyan
  const [taxRate, setTaxRate] = useState("18.0");

  return (
    <ThemeContext.Provider value={{ 
      siteName, primaryColor, accentColor, taxRate,
      setSiteName, setPrimaryColor, setAccentColor, setTaxRate 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};