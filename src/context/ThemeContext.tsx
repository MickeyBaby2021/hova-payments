
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Default to light mode
    const savedTheme = localStorage.getItem("hovapay-theme");
    return (savedTheme as Theme) || "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Set CSS variables based on theme
    if (theme === "dark") {
      // Dark theme with purple accents
      root.style.setProperty("--background", "#121212");
      root.style.setProperty("--foreground", "#ffffff");
      root.style.setProperty("--card", "#1e1e1e");
      root.style.setProperty("--card-foreground", "#ffffff");
      root.style.setProperty("--primary", "#8b5cf6");
      root.style.setProperty("--primary-foreground", "#ffffff");
      root.style.setProperty("--secondary", "#2d2d2d");
      root.style.setProperty("--secondary-foreground", "#ffffff");
      root.style.setProperty("--muted", "#1e1e1e");
      root.style.setProperty("--muted-foreground", "#a0a0a0");
      root.style.setProperty("--border", "#333333");
      root.style.setProperty("--input", "#1e1e1e");
      root.style.setProperty("--hover", "#9b69fd");
      root.style.setProperty("--hover-foreground", "#ffffff");
    } else {
      // Light iOS-inspired theme with purple accents
      root.style.setProperty("--background", "#f5f5f7");
      root.style.setProperty("--foreground", "#000000");
      root.style.setProperty("--card", "#ffffff");
      root.style.setProperty("--card-foreground", "#000000");
      root.style.setProperty("--primary", "#8b5cf6");
      root.style.setProperty("--primary-foreground", "#ffffff");
      root.style.setProperty("--secondary", "#f2f2f7");
      root.style.setProperty("--secondary-foreground", "#000000");
      root.style.setProperty("--muted", "#f5f5f7");
      root.style.setProperty("--muted-foreground", "#6b7280");
      root.style.setProperty("--border", "#e5e5e5");
      root.style.setProperty("--input", "#f5f5f7");
      root.style.setProperty("--hover", "#7c4dff");
      root.style.setProperty("--hover-foreground", "#ffffff");
    }
    
    localStorage.setItem("hovapay-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
