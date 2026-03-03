"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { BIRTHDAY_DAY, BIRTHDAY_MONTH, isBirthdayInTimeZone } from "@/lib/birthday";

interface ConfettiPiece {
    id: number;
    left: number;
    delay: number;
    duration: number;
    width: number;
    height: number;
    drift: number;
    color: string;
}

const CONFETTI_COLORS = ["#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#ec4899", "#f97316"];

function buildConfettiPieces(): ConfettiPiece[] {
    return Array.from({ length: 20 }, (_, index) => ({
        id: index,
        left: 4 + index * 4.6,
        delay: (index % 7) * 0.45,
        duration: 6 + (index % 5) * 0.7,
        width: 5 + (index % 3),
        height: 10 + (index % 4) * 2,
        drift: (index % 2 === 0 ? 1 : -1) * (16 + (index % 4) * 6),
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
    }));
}

export function BirthdayCelebration() {
    const [isBirthdayMode, setIsBirthdayMode] = useState(() => isBirthdayInTimeZone());
    const confettiPieces = useMemo(() => buildConfettiPieces(), []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsBirthdayMode((previous) => {
                const next = isBirthdayInTimeZone();
                return previous === next ? previous : next;
            });
        }, 60_000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    if (!isBirthdayMode) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
            {confettiPieces.map((piece) => (
                <motion.span
                    key={piece.id}
                    className="absolute -top-8 rounded-sm"
                    style={{
                        left: `${piece.left}%`,
                        width: `${piece.width}px`,
                        height: `${piece.height}px`,
                        backgroundColor: piece.color,
                    }}
                    initial={{ opacity: 0, y: -32, rotate: 0, x: 0 }}
                    animate={{
                        opacity: [0, 0.95, 0.95, 0],
                        y: ["0vh", "112vh"],
                        rotate: [0, 220, 420],
                        x: [0, piece.drift, -piece.drift, 0],
                    }}
                    transition={{
                        duration: piece.duration,
                        delay: piece.delay,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                />
            ))}

            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-1/2 -translate-x-1/2"
            >
                <div className="rounded-full border border-amber-300/70 bg-amber-100/90 px-4 py-1 text-xs font-semibold tracking-wide text-amber-900 shadow-sm backdrop-blur-sm dark:border-amber-500/50 dark:bg-amber-600/25 dark:text-amber-100">
                    Birthday Celebration Active - {BIRTHDAY_MONTH}/{BIRTHDAY_DAY}
                </div>
            </motion.div>
        </div>
    );
}
