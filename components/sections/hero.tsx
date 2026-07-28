"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/utils";

export function Hero() {
    return (
        <section className="mx-auto max-w-6xl px-5 pb-12 pt-12 sm:px-8 sm:pb-24 sm:pt-28 lg:pb-28">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-8 sm:gap-12"
            >
                <motion.p
                    variants={fadeInUp}
                    className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-neutral-600"
                >
                    FULL-STACK & MOBILE DEVELOPER
                </motion.p>

                <motion.div variants={fadeInUp} className="max-w-5xl">
                    <h1 className="font-display text-4xl font-semibold leading-[1.02] text-black sm:text-7xl lg:text-8xl sm:leading-[0.98]">
                        {personalInfo.tagline}
                    </h1>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    className="grid gap-8 border-t border-neutral-200 pt-8 lg:grid-cols-[1fr_0.78fr]"
                >
                    <p className="max-w-2xl text-lg leading-8 text-neutral-700 sm:text-xl">
                        Focused on web development and app development.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                        <a
                            href="#work"
                            className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-black bg-black px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-black active:bg-white active:text-black"
                            aria-label="View selected work"
                        >
                            View Work
                            <ArrowDown size={16} />
                        </a>
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-black px-5 py-3 text-sm font-semibold text-black transition-colors duration-200 hover:bg-black hover:text-white active:bg-black active:text-white"
                            aria-label={`Send email to ${personalInfo.email}`}
                        >
                            Send Email
                            <Mail size={16} />
                        </a>
                        <a
                            href={personalInfo.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center gap-2 px-2 py-3 text-sm font-semibold text-neutral-700 underline decoration-neutral-300 transition-colors duration-200 hover:text-black hover:decoration-black"
                            aria-label="Open resume"
                        >
                            Resume
                            <FileText size={16} />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    className="grid gap-4 border-y border-black py-5 font-mono text-xs uppercase tracking-[0.16em] text-neutral-600 sm:grid-cols-3"
                >
                    <span>Laguna, Philippines</span>
                    <span>Freelance / Capstone / Client Systems</span>
                    <a
                        href={personalInfo.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-black transition-opacity duration-200 hover:opacity-65 sm:justify-end"
                    >
                        Portfolio
                        <ArrowUpRight size={14} />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
