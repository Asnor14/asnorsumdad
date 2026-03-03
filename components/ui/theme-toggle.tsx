"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    if (!resolvedTheme) {
        return (
            <button
                className="relative inline-flex h-8 w-14 items-center rounded-full border border-neutral-300/70 bg-neutral-200 px-1 dark:border-neutral-700 dark:bg-neutral-800"
                role="switch"
                aria-checked={false}
                aria-label="Toggle theme"
            >
                <span className="h-6 w-6 rounded-full bg-white shadow-sm" />
            </button>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative inline-flex h-8 w-14 items-center rounded-full border border-neutral-300/70 bg-neutral-200 px-1 dark:border-neutral-700 dark:bg-neutral-800 transition-colors duration-300 motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            role="switch"
            aria-checked={isDark}
            aria-label="Toggle theme"
        >
            <Moon
                className={`absolute left-2 h-3.5 w-3.5 transition-colors duration-300 motion-reduce:transition-none ${isDark ? "text-neutral-500" : "text-neutral-700"
                    }`}
            />
            <Sun
                className={`absolute right-2 h-3.5 w-3.5 transition-colors duration-300 motion-reduce:transition-none ${isDark ? "text-amber-500" : "text-neutral-400"
                    }`}
            />
            <span
                className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm dark:bg-neutral-900 transition-transform duration-300 ease-out motion-reduce:transition-none ${isDark ? "translate-x-6" : "translate-x-0"
                    }`}
            >
                <Sun
                    className={`absolute h-3.5 w-3.5 text-amber-500 transition-all duration-200 motion-reduce:transition-none ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-45 opacity-0"
                        }`}
                />
                <Moon
                    className={`absolute h-3.5 w-3.5 text-neutral-600 dark:text-neutral-300 transition-all duration-200 motion-reduce:transition-none ${isDark ? "scale-75 rotate-45 opacity-0" : "scale-100 rotate-0 opacity-100"
                        }`}
                />
            </span>
        </button>
    );
}
