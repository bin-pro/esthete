"use client";

import { createContext } from "react";

export const ThemeContext = createContext(null);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value={null}>{children}</ThemeContext.Provider>;
}
