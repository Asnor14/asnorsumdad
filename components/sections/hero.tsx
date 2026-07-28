"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/utils";

export function Hero() {
    return (
        <section className="mx-auto max-w-5xl px-5 pb-10 pt-10 sm:px-8 sm:pb-16 sm:pt-20">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-6 sm:gap-10"
            >
                <motion.p
                    variants={fadeInUp}
                    className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500"
                >
                    FULL-STACK & MOBILE DEVELOPER
                </motion.p>

                <motion.div variants={fadeInUp} className="max-w-4xl">
                    <h1 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-6xl">
                        {personalInfo.tagline}
                    </h1>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    className="grid gap-6 border-t border-neutral-200 pt-6 lg:grid-cols-[1fr_0.78fr] lg:items-center"
                >
                    <p className="max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg">
                        Focused on web development and app development. Also available for workflow automation (n8n) and video editing.
                    </p>

                    <div className="flex flex-wrap items-center gap-2.5 lg:justify-end">
                        <a
                            href="#work"
                            className="inline-flex min-h-[40px] items-center justify-center gap-1.5 border border-black bg-black px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-white hover:text-black active:bg-white active:text-black"
                            aria-label="View selected work"
                        >
                            View Work
                            <ArrowDown size={14} />
                        </a>
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="inline-flex min-h-[40px] items-center justify-center gap-1.5 border border-black px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-black transition-colors duration-200 hover:bg-black hover:text-white active:bg-black active:text-white"
                            aria-label={`Send email to ${personalInfo.email}`}
                        >
                            Send Email
                            <Mail size={14} />
                        </a>
                        <a
                            href={personalInfo.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[40px] items-center gap-1.5 px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-neutral-700 underline decoration-neutral-300 transition-colors duration-200 hover:text-black hover:decoration-black"
                            aria-label="Open resume"
                        >
                            Resume
                            <FileText size={14} />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    className="grid gap-3 border-y border-black py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-600 sm:grid-cols-3"
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
                        <ArrowUpRight size={13} />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
