"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Download, Send, Gamepad2, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { BIRTHDAY_DAY, BIRTHDAY_MONTH, isBirthdayInTimeZone } from "@/lib/birthday";
import { personalInfo } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const gameLogos = [
    "/gameLogo/lovejoyhope.png",
    "/gameLogo/sixseven.png",
    "/gameLogo/saythe%20word%20on%20beat.png",
];

export function Hero() {
    const { resolvedTheme } = useTheme();
    const [isToggled, setIsToggled] = useState(false);
    const [isBirthdayMode, setIsBirthdayMode] = useState(() => isBirthdayInTimeZone());
    const [isGameModalOpen, setIsGameModalOpen] = useState(false);
    const [activeGameLogoIndex, setActiveGameLogoIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsBirthdayMode((previous) => {
                const next = isBirthdayInTimeZone();
                return previous === next ? previous : next;
            });
        }, 60_000);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        if (!isGameModalOpen) return;

        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isGameModalOpen]);

    useEffect(() => {
        if (!isGameModalOpen) return;

        const intervalId = setInterval(() => {
            setActiveGameLogoIndex((previous) => (previous + 1) % gameLogos.length);
        }, 1400);

        return () => {
            clearInterval(intervalId);
        };
    }, [isGameModalOpen]);

    const isDark = resolvedTheme === "dark";

    let currentAvatar: string;
    if (isBirthdayMode) {
        currentAvatar = "/bday.png";
    } else if (isDark) {
        currentAvatar = isToggled ? "/avatar-awake.png" : "/avatar-sleep.png";
    } else {
        currentAvatar = "/avatar1.png";
    }

    const handleMouseEnter = () => {
        if (isBirthdayMode) return;
        if (isDark) setIsToggled(true);
    };

    const handleMouseLeave = () => {
        if (isBirthdayMode) return;
        if (isDark) setIsToggled(false);
    };

    const handleClick = () => {
        if (isBirthdayMode || !isDark) return;
        setIsToggled(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsToggled(false);
        }, 3000);
    };

    const openGameModal = () => {
        setActiveGameLogoIndex(0);
        setIsGameModalOpen(true);
    };

    return (
        <section className="mb-8">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-row items-start gap-4 sm:gap-6"
            >

                <motion.div
                    variants={fadeInUp}
                    className="flex-shrink-0"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    <div
                        className={`w-28 h-28 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-lg border-2 border-neutral-200 dark:border-neutral-700 relative cursor-pointer ${isBirthdayMode ? "ring-2 ring-amber-400/70 animate-pulse" : ""}`}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentAvatar}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="w-full h-full"
                            >
                                <Image
                                    src={currentAvatar}
                                    alt={personalInfo.name}
                                    width={160}
                                    height={160}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Content - Always on right */}
                <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="min-w-0">
                            <motion.h1
                                variants={fadeInUp}
                                className="text-lg sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-1.5 sm:gap-2"
                            >
                                {personalInfo.name}
                                <VerifiedBadge className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.h1>

                            <motion.div
                                variants={fadeInUp}
                                className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mt-0.5 sm:mt-1"
                            >
                                <MapPin size={12} className="sm:w-3.5 sm:h-3.5" />
                                <span>{personalInfo.location}</span>
                            </motion.div>

                            <motion.p
                                variants={fadeInUp}
                                className="text-neutral-700 dark:text-neutral-300 font-medium text-xs sm:text-base mt-0.5 sm:mt-1"
                            >
                                {personalInfo.role}
                            </motion.p>
                        </div>

                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center sm:items-end gap-2 sm:min-w-[136px]"
                        >
                            <ThemeToggle />
                        </motion.div>
                    </div>

                    {isBirthdayMode && (
                        <motion.p
                            variants={fadeInUp}
                            className="inline-flex mt-2 rounded-full border border-amber-300/70 bg-amber-100/80 px-3 py-1 text-[11px] sm:text-xs font-semibold text-amber-900 dark:border-amber-500/60 dark:bg-amber-600/25 dark:text-amber-100"
                        >
                            Birthday Mode: {BIRTHDAY_MONTH}/{BIRTHDAY_DAY}
                        </motion.p>
                    )}

                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-4"
                    >
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => window.open("/resume.pdf", "_blank")}
                            className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2"
                        >
                            <Download size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span className="hidden sm:inline">Download </span>Resume
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => (window.location.href = `mailto:${personalInfo.email}`)}
                            className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2"
                        >
                            <Send size={12} className="sm:w-3.5 sm:h-3.5" />
                            <span className="hidden sm:inline">Send </span>Email
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={openGameModal}
                            className="gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2"
                        >
                            <Gamepad2 size={12} className="text-yellow-500 sm:w-3.5 sm:h-3.5" />
                            <span className="hidden sm:inline">Play </span>Games
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isGameModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setIsGameModalOpen(false)}
                    >
                        <div className="absolute inset-0 bg-black/65 backdrop-blur-md" />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 18 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 18 }}
                            transition={{ duration: 0.2 }}
                            onClick={(event) => event.stopPropagation()}
                            className="relative w-full max-w-2xl min-h-[360px] sm:min-h-[440px] overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-2xl"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={gameLogos[activeGameLogoIndex]}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={gameLogos[activeGameLogoIndex]}
                                        alt="Game logo"
                                        fill
                                        className="object-cover scale-110"
                                    />
                                </motion.div>
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

                            <button
                                onClick={() => setIsGameModalOpen(false)}
                                className="absolute top-3 right-3 z-10 rounded-full p-2 bg-white/15 hover:bg-white/25 text-white transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={16} />
                            </button>

                            <div className="relative z-10 flex min-h-[360px] sm:min-h-[440px] flex-col items-center justify-center px-6 py-10 text-center">
                                <p className="text-[11px] font-semibold tracking-[0.2em] text-neutral-200 uppercase">
                                    Play Games
                                </p>
                                <h3 className="mt-2 text-3xl font-bold text-white">Coming Soon</h3>
                                <p className="mt-2 text-sm text-neutral-200">
                                    Game section is under development. Check back soon.
                                </p>
                                <div className="mt-6 flex items-center gap-3">
                                    {gameLogos.map((logo, index) => (
                                        <motion.div
                                            key={logo}
                                            animate={{
                                                opacity: activeGameLogoIndex === index ? 1 : 0.45,
                                                scale: activeGameLogoIndex === index ? 1.05 : 0.92,
                                            }}
                                            transition={{ duration: 0.35 }}
                                            className="relative h-11 w-11 overflow-hidden rounded-xl border border-white/35 shadow-md"
                                        >
                                            <Image
                                                src={logo}
                                                alt={`Game icon ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
