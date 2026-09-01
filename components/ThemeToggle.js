"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("kisanSetuTheme");

    let isDark = false;

    if (savedTheme === "dark") {
      isDark = true;
    } else if (savedTheme === "light") {
      isDark = false;
    } else {
      isDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    }

    document.documentElement.classList.toggle(
      "dark",
      isDark
    );

    setDark(isDark);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const newTheme = !dark;

    document.documentElement.classList.toggle(
      "dark",
      newTheme
    );

    localStorage.setItem(
      "kisanSetuTheme",
      newTheme ? "dark" : "light"
    );

    setDark(newTheme);
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="theme-toggle"
        aria-label="Toggle theme"
      >
        <span className="theme-toggle-placeholder" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={
        dark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        dark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      <span className="theme-icon">
        {dark ? "☀" : "☾"}
      </span>

      <span className="hidden sm:inline">
        {dark ? "Light" : "Dark"}
      </span>
    </button>
  );
}