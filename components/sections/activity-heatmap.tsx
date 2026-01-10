"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { fadeInUp } from "@/lib/utils";

// Define the component type
type GitHubCalendarComponent = React.ComponentType<{
    username: string;
    colorScheme?: "light" | "dark";
    fontSize?: number;
    blockSize?: number;
    blockMargin?: number;
}>;

export function ActivityHeatmap() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [mounted, setMounted] = useState(false);
    const [Calendar, setCalendar] = useState<GitHubCalendarComponent | null>(null);
    const [error, setError] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
        // Dynamic import on client side only
        import("react-github-calendar")
            .then((mod) => {
                // Handle both default and named exports
                const Component = mod.default || mod.GitHubCalendar || mod;
                if (Component && typeof Component === "function") {
                    setCalendar(() => Component as GitHubCalendarComponent);
                } else {
                    setError(true);
                }
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    // Loading state
    if (!mounted) {
        return (
            <div className="animate-pulse">
                <div className="h-4 w-40 bg-neutral-200 dark:bg-neutral-800 rounded mb-3" />
                <div className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded" />
            </div>
        );
    }

    // Error fallback - show static text
    if (error || !Calendar) {
        return (
            <motion.div
                ref={ref}
                variants={fadeInUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    View my contributions on{" "}
                    <a
                        href="https://github.com/Asnor14"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        GitHub
                    </a>
                </p>
            </motion.div>
        );
    }

    const colorScheme = resolvedTheme === "dark" ? "dark" : "light";

    return (
        <motion.div
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className="overflow-x-auto">
                <Calendar
                    username="Asnor14"
                    colorScheme={colorScheme}
                    fontSize={12}
                    blockSize={10}
                    blockMargin={3}
                />
            </div>
        </motion.div>
    );
}
