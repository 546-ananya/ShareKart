"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const ThemeProvider = ({ defaultTheme, storageKey, children }) => {
  const [theme, setTheme] = useState(defaultTheme || "system")

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey)
    if (storedTheme) {
      setTheme(storedTheme)
    } else {
      setTheme(defaultTheme || "system")
    }
  }, [defaultTheme, storageKey])

  useEffect(() => {
    console.log("current theme:",theme);
    localStorage.setItem(storageKey, theme)
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.classList.toggle("dark", isDark)
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme, storageKey])

  const value = {
    theme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

