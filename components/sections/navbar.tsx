"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks, personalInfo } from "@/lib/data";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white lg:hidden">
            <nav
                aria-label="Primary navigation"
                className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 sm:px-8"
            >
                <a
                    href="#"
                    className="inline-flex min-h-[40px] items-center font-mono text-xs font-semibold uppercase tracking-[0.18em] text-black transition-opacity duration-200 hover:opacity-65"
                    aria-label={`${personalInfo.name} home`}
                >
                    ASNOR SUMDAD
                </a>

                <div className="hidden items-center gap-6 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-600 transition-colors duration-200 hover:text-black"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen((current) => !current)}
                    className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center gap-2 border border-black px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-black transition-colors duration-200 hover:bg-black hover:text-white active:bg-black active:text-white md:hidden"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-navigation"
                    aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                >
                    <span>{isMobileMenuOpen ? "Close" : "Menu"}</span>
                    {isMobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
                </button>
            </nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-navigation"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="border-t border-neutral-200 bg-white md:hidden"
                    >
                        <div className="mx-auto grid max-w-5xl px-5 py-2 sm:px-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="border-b border-neutral-200 py-3 font-display text-xl text-black last:border-b-0"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
