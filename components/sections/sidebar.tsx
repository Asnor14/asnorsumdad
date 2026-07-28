"use client";

import { motion } from "framer-motion";
import {
    Award,
    Briefcase,
    Github,
    Instagram,
    Layers,
    Linkedin,
    Mail,
    User,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { personalInfo } from "@/lib/data";

const sidebarLinks = [
    { name: "Profile", href: "#profile", Icon: User },
    { name: "Work", href: "#work", Icon: Briefcase },
    { name: "Stack", href: "#stack", Icon: Layers },
    { name: "Certificates", href: "#certificates", Icon: Award },
    { name: "Contact", href: "#contact", Icon: Mail },
];

const sidebarSocials = [
    { name: "GitHub", href: personalInfo.github, Icon: Github },
    { name: "LinkedIn", href: personalInfo.linkedin, Icon: Linkedin },
    { name: "Instagram", href: personalInfo.instagram, Icon: Instagram },
];

export function Sidebar() {
    const [activeSection, setActiveSection] = useState("#profile");

    const updateActiveSection = useCallback(() => {
        const sectionIds = sidebarLinks.map((link) => link.href.replace("#", ""));
        const viewportOffset = 220;

        for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i]);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= viewportOffset) {
                    setActiveSection(`#${sectionIds[i]}`);
                    break;
                }
            }
        }
    }, []);

    useEffect(() => {
        const handle = requestAnimationFrame(updateActiveSection);
        window.addEventListener("scroll", updateActiveSection, { passive: true });
        return () => {
            cancelAnimationFrame(handle);
            window.removeEventListener("scroll", updateActiveSection);
        };
    }, [updateActiveSection]);

    const handleLinkClick = (href: string) => {
        setActiveSection(href);
    };

    return (
        <aside
            className="fixed left-0 top-0 z-50 hidden h-screen w-16 flex-col items-center border-r border-neutral-200 bg-white py-6 lg:flex"
            aria-label="Sidebar navigation"
        >
            {/* Logo monogram */}
            <a
                href="#"
                onClick={() => handleLinkClick("#profile")}
                className="mb-8 flex h-9 w-9 items-center justify-center border border-black font-mono text-xs font-bold text-black transition-colors duration-200 hover:bg-black hover:text-white"
                aria-label="Back to top"
            >
                AS
            </a>

            {/* Section nav */}
            <nav className="flex flex-1 flex-col items-center gap-2" aria-label="Section navigation">
                {sidebarLinks.map((link) => {
                    const isActive = activeSection === link.href;
                    const Icon = link.Icon;

                    return (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => handleLinkClick(link.href)}
                            className={`group relative flex h-10 w-10 items-center justify-center transition-colors duration-200 ${
                                isActive
                                    ? "bg-black text-white"
                                    : "text-neutral-500 hover:bg-neutral-100 hover:text-black"
                            }`}
                            aria-label={link.name}
                            aria-current={isActive ? "true" : undefined}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="sidebar-indicator"
                                    className="absolute -left-[16px] h-6 w-[4px] bg-black"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <Icon size={18} />

                            {/* Tooltip */}
                            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap border border-neutral-200 bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-800 opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
                                {link.name}
                            </span>
                        </a>
                    );
                })}
            </nav>

            {/* Social links at bottom */}
            <div className="mt-auto flex flex-col items-center gap-1 border-t border-neutral-200 pt-4">
                {sidebarSocials.map((social) => {
                    const Icon = social.Icon;

                    return (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center text-neutral-400 transition-colors duration-200 hover:text-black"
                            aria-label={social.name}
                        >
                            <Icon size={16} />
                        </a>
                    );
                })}
            </div>
        </aside>
    );
}
